import os
import sys
import builtins
import mysql.connector
import openai
import requests
from bs4 import BeautifulSoup
import json
import time

# Fix Python I/O encoding on Windows console
try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    os.environ.setdefault('PYTHONIOENCODING', 'utf-8')

def safe_print(*args, **kwargs):
    try:
        builtins.print(*args, **kwargs)
    except UnicodeEncodeError:
        encoding = getattr(sys.stdout, 'encoding', None) or 'utf-8'
        safe_args = []
        for arg in args:
            text = str(arg)
            try:
                text = text.encode(encoding, errors='replace').decode(encoding)
            except Exception:
                text = text.encode('utf-8', errors='replace').decode('utf-8')
            safe_args.append(text)
        builtins.print(*safe_args, **kwargs)

print = safe_print

# --- CONFIGURATION ---
# Remplacez par vos vrais accès
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
DB_CONFIG = {
    'host': os.environ.get("DB_HOST", "localhost"),
    'user': os.environ.get("DB_USERNAME", "root"),
    'password': os.environ.get("DB_PASSWORD", ""),
    'database': os.environ.get("DB_DATABASE", "platform_industry") # Nom de votre base Laravel
}

# Limite le nombre de recherches par exécution
MAX_SEARCH_QUERIES = 10  # Mettre None pour traiter toutes les combinaisons

# Liste des pays fournie
COUNTRIES_AR = [
    "الأردن", "الإمارات", "البحرين", "تونس", "الجزائر", "جيبوتي", 
    "السعودية", "السودان", "سوريا", "الصومال", "العراق", "عمان", 
    "فلسطين", "قطر", "الكويت", "لبنان", "ليبيا", "مصر", "المغرب", 
    "موريتانيا", "اليمن"
]

# Domaines de recherche ciblés
# RESEARCH_FIELDS = ["الذكاء الاصطناعي", "الطاقة المتجددة", "البيوتكنولوجيا", "الهندسة الصناعية"]
# ================= FIELDS =================
TECH_FIELDS = [
    "الذكاء الاصطناعي", "تعلم الآلة", "تحليل البيانات",
    "الأمن السيبراني", "تطوير البرمجيات", "الحوسبة السحابية"
]

ENGINEERING_FIELDS = [
    "الهندسة المدنية", "الهندسة الصناعية", "الهندسة الكهربائية",
    "الهندسة الميكانيكية"
]

AGRI_FIELDS = [
    "الزراعة", "إدارة المياه", "التنمية المستدامة",
    "الطاقات المتجددة"
]

MED_FIELDS = [
    "الطب", "الصيدلة", "البيوتكنولوجيا"
]

BUSINESS_FIELDS = [
    "الاقتصاد", "إدارة الأعمال", "التسويق"
]

SCIENCE_FIELDS = [
    "الرياضيات", "الفيزياء", "الكيمياء"
]

RESEARCH_FIELDS = (
    TECH_FIELDS +
    ENGINEERING_FIELDS +
    AGRI_FIELDS +
    MED_FIELDS +
    BUSINESS_FIELDS +
    SCIENCE_FIELDS
)


def get_researchers_from_ai(html_content, country, field):
    openai.api_key = OPENAI_API_KEY
    
    # On précise bien le nom de la clé attendue dans le prompt
    prompt = f"""
    Extrait une liste de chercheurs en {field} au {country}.
    Retourne UNIQUEMENT un objet JSON avec la clé "researchers" contenant la liste.
    Format: {{ "researchers": [ {{"full_name": "...", "email": "...", "research_field": "{field}", "country": "{country}"}} ] }}
    Ne retourne que des chercheurs ayant un email valide. Si aucun email n'est disponible, n'inclus pas cette personne.
    Texte : {html_content[:2000]} 
    """

    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "Tu es un extracteur de données précises."},
                      {"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        res = json.loads(response.choices[0].message.content)
        print(f"DEBUG IA : {res}") # Regarde bien ce qui s'affiche ici
        
        # On force la récupération de la liste peu importe le nom de la clé
        if isinstance(res, dict):
            for key in res:
                if isinstance(res[key], list):
                    return res[key]
        return res if isinstance(res, list) else []
    except Exception as e:
        print(f"Erreur OpenAI: {e}")
        return []


def fetch_page_text(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    if any(url.lower().endswith(ext) for ext in ['.pdf', '.doc', '.docx', '.ppt', '.pptx']):
        return ''

    try:
        response = requests.get(url, headers=headers, timeout=12)
        if response.status_code != 200:
            return ''

        content_type = response.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            return ''

        soup = BeautifulSoup(response.text, 'html.parser')
        for tag in soup(['script', 'style', 'noscript']):
            tag.extract()

        text = ' '.join(soup.stripped_strings)
        return text[:3000]
    except Exception:
        return ''


def get_duckduckgo_search_results(search_query):
    search_url = 'https://html.duckduckgo.com/html/'
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

    try:
        response = requests.post(search_url, headers=headers, data={'q': search_query}, timeout=15)
        if response.status_code != 200:
            print(f"DEBUG HTTP: DuckDuckGo {response.status_code} pour {search_query}")
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        results = []
        snippets = [item.text.strip() for item in soup.select('div.result__snippet, span.result__snippet')]

        for index, a in enumerate(soup.select('a.result__a')[:6]):
            url = a.get('href', '').strip()
            title = a.text.strip()
            snippet = snippets[index] if index < len(snippets) else ''
            if url:
                results.append({'title': title, 'url': url, 'snippet': snippet})

        return results
    except Exception as e:
        print(f"Erreur DuckDuckGo: {e}")
        return []


def save_to_db(data, default_country=None):
    """Insère les données dans la table 'researchers' de Laravel"""
    if not isinstance(data, list):
        print(f"DEBUG DB: données invalides, attendu une liste mais reçu {type(data).__name__}")
        return

    print(f"DEBUG DB: préparation à insérer {len(data)} éléments")
    inserted_count = 0

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        sql = """INSERT IGNORE INTO researchers (full_name, email, research_field, country, created_at, updated_at) 
                 VALUES (%s, %s, %s, %s, NOW(), NOW())"""
        
        for item in data:
            if not all(key in item for key in ['full_name', 'email', 'research_field']):
                print(f"DEBUG DB: élément ignoré, clés manquantes -> {item}")
                continue

            if not item['email'] or not item['email'].strip():
                print(f"DEBUG DB: élément ignoré, email manquant -> {item}")
                continue

            country_value = item.get('country') or default_country
            if not country_value:
                print(f"DEBUG DB: élément ignoré, country manquant -> {item}")
                continue

            cursor.execute(sql, (
                item['full_name'],
                item['email'],
                item['research_field'],
                country_value
            ))
            if cursor.rowcount == 1:
                inserted_count += 1

        conn.commit()
        print(f"--- {inserted_count} chercheurs ajoutés avec succès.")
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Erreur Database: {e}")


def start_automation():
    """Boucle principale de recherche"""
    search_count = 0

    for country in COUNTRIES_AR:
        for field in RESEARCH_FIELDS:
            if MAX_SEARCH_QUERIES is not None and search_count >= MAX_SEARCH_QUERIES:
                print(f"DEBUG STOP: limite de {MAX_SEARCH_QUERIES} recherches atteinte. Le script s'arrête.")
                return

            search_count += 1
            print(f"\nRecherche {search_count}/{MAX_SEARCH_QUERIES or '∞'} : {field} en/au {country}...")
            search_query = f"chercheur {field} {country} university profile"

            search_results = get_duckduckgo_search_results(search_query)
            if not search_results:
                print(f"DEBUG SCRAP: aucun résultat DuckDuckGo pour {country} / {field}")
                time.sleep(5)
                continue

            source_text = f"Recherche: {search_query}\n"
            for item in search_results:
                source_text += f"Titre: {item['title']}\nURL: {item['url']}\nSnippet: {item['snippet']}\n"
                page_text = fetch_page_text(item['url'])
                if page_text:
                    source_text += f"Contenu page: {page_text}\n"

            if len(source_text) > 18000:
                source_text = source_text[:18000]

            researchers = get_researchers_from_ai(source_text, country, field)
            print(f"DEBUG SCRAP: {len(researchers)} chercheurs extraits pour {field} / {country}")
            if not researchers:
                print(f"DEBUG SCRAP: aucun chercheur trouvé pour {field} / {country}")
            else:
                save_to_db(researchers, default_country=country)

            time.sleep(5)

    print(f"\nFIN: {search_count} recherches effectuées.")

if __name__ == "__main__":
    start_automation()