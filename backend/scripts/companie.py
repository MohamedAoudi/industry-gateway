import os
# import mysql.connector
# import openai
# import requests
# from bs4 import BeautifulSoup
# import json
# import random
# import time

# # --- CONFIGURATION ---
# # Remplacez par vos vrais accès
# OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
# DB_CONFIG = {
#     'host': os.environ.get("DB_HOST", "localhost"),
#     'user': os.environ.get("DB_USERNAME", "root"),
#     'password': os.environ.get("DB_PASSWORD", ""),
#     'database': os.environ.get("DB_DATABASE", "platform_industry") # Nom de votre base Laravel
# }

# # Limite le nombre de recherches par exécution
# MAX_SEARCH_QUERIES = 10  # Mettre None pour traiter toutes les combinaisons

# # Liste des pays fournie
# COUNTRIES_AR = [
#     "الأردن", "الإمارات", "البحرين", "تونس", "الجزائر", "جيبوتي", 
#     "السعودية", "السودان", "سوريا", "الصومال", "العراق", "عمان", 
#     "فلسطين", "قطر", "الكويت", "لبنان", "ليبيا", "مصر", "المغرب", 
#     "موريتانيا", "اليمن"
# ]

# # Secteurs d'industrie ciblés
# # Traductions anglaises pour améliorer les recherches
# INDUSTRY_SECTORS_EN = {
#     "الطاقة المتجددة": "renewable energy company",
#     "البناء والإنشاءات": "construction company",
#     "الصناعات الغذائية": "food industry company",
#     "السيارات": "automotive company",
#     "النفط والغاز": "oil and gas company",
#     "الزراعة": "agricultural company",
#     "التجارة الإلكترونية": "e-commerce company",
#     "الخدمات المالية": "financial services company"
# }
# # Liste simple des secteurs
# INDUSTRY_SECTORS = [
#     "الطاقة المتجددة", "البناء والإنشاءات", "الصناعات الغذائية",
#     "السيارات", "النفط والغاز", "الزراعة", "التجارة الإلكترونية", "الخدمات المالية"
# ]


# def get_companies_from_ai(html_content, country, sector):
#     openai.api_key = OPENAI_API_KEY
    
#     # On précise bien le nom de la clé attendue dans le prompt
#     prompt = f"""
#     Extrait une liste d'entreprises dans le secteur {sector} au {country}.
#     Retourne UNIQUEMENT un objet JSON avec la clé "companies" contenant la liste.
#     Format: {{ "companies": [ {{"company_name": "...", "email": "...", "industry_sector": "{sector}", "country": "{country}"}} ] }}
#     Ne retourne que des entreprises ayant un email valide. Si aucun email n'est disponible, n'inclus pas cette personne.
#     Texte : {html_content[:2000]} 
#     """

#     try:
#         response = openai.chat.completions.create(
#             model="gpt-4o",
#             messages=[{"role": "system", "content": "Tu es un extracteur de données précises."},
#                       {"role": "user", "content": prompt}],
#             response_format={ "type": "json_object" }
#         )
        
#         res = json.loads(response.choices[0].message.content)
#         print(f"DEBUG IA : {res}")
        
#         # On force la récupération de la liste peu importe le nom de la clé
#         if isinstance(res, dict):
#             for key in res:
#                 if isinstance(res[key], list):
#                     return res[key]
#         return res if isinstance(res, list) else []
#     except Exception as e:
#         print(f"Erreur OpenAI: {e}")
#         return []


# def fetch_page_text(url):
#     headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
#     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
#     "Accept-Language": "en-US,en;q=0.5",
#     "Accept-Encoding": "gzip, deflate",
#     "Connection": "keep-alive",
#     "Upgrade-Insecure-Requests": "1",
# }
#     if any(url.lower().endswith(ext) for ext in ['.pdf', '.doc', '.docx', '.ppt', '.pptx']):
#         return ''

#     try:
#         response = requests.get(url, headers=headers, timeout=12)
#         if response.status_code != 200:
#             return ''

#         content_type = response.headers.get('Content-Type', '')
#         if 'text/html' not in content_type:
#             return ''

#         soup = BeautifulSoup(response.text, 'html.parser')
#         for tag in soup(['script', 'style', 'noscript']):
#             tag.extract()

#         text = ' '.join(soup.stripped_strings)
#         return text[:3000]
#     except Exception:
#         return ''


# def get_duckduckgo_search_results(search_query, country, sector):
#     """Essaie plusieurs variantes de recherche pour trouver des résultats"""
    
#     # Essayer d'abord en anglais si disponible
#     english_sector = INDUSTRY_SECTORS_EN.get(sector, sector)
    
#     search_variants = [
#         f"{english_sector} {country} company contact email",
#         f"{english_sector} in {country} business email",
#         f"شركة {sector} {country} contact email",
#         f"{sector} {country} company email",
#         f"{english_sector} {country} contact information"
#     ]
    
#     for variant in search_variants:
#         print(f"DEBUG SEARCH: Essai variante: {variant}")
#         results = _search_duckduckgo_single(variant)
#         if results:
#             print(f"DEBUG SEARCH: Trouvé {len(results)} résultats avec: {variant}")
#             return results
    
#     print(f"DEBUG SEARCH: Aucune variante n'a fonctionné pour {sector} / {country}")
#     return []

# def _search_duckduckgo_single(search_query):
#     search_url = 'https://html.duckduckgo.com/html/'
#     headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
#     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
#     "Accept-Language": "en-US,en;q=0.5",
#     "Accept-Encoding": "gzip, deflate",
#     "Connection": "keep-alive",
#     "Upgrade-Insecure-Requests": "1",
# }

#     try:
#         response = requests.post(search_url, headers=headers, data={'q': search_query}, timeout=15)
#         if response.status_code != 200:
#             print(f"DEBUG HTTP: DuckDuckGo {response.status_code} pour {search_query}")
#             return []

#         soup = BeautifulSoup(response.text, 'html.parser')
#         results = []
#         snippets = [item.text.strip() for item in soup.select('div.result__snippet, span.result__snippet')]

#         for index, a in enumerate(soup.select('a.result__a')[:6]):
#             url = a.get('href', '').strip()
#             title = a.text.strip()
#             snippet = snippets[index] if index < len(snippets) else ''
#             if url:
#                 results.append({'title': title, 'url': url, 'snippet': snippet})

#         return results
#     except Exception as e:
#         print(f"Erreur DuckDuckGo: {e}")
#         return []


# def save_companies_to_db(data, default_country=None):
#     """Insère les données dans la table 'companies' de Laravel"""
#     if not isinstance(data, list):
#         print(f"DEBUG DB: données invalides, attendu une liste mais reçu {type(data).__name__}")
#         return

#     print(f"DEBUG DB: préparation à insérer {len(data)} entreprises")
#     inserted_count = 0

#     try:
#         conn = mysql.connector.connect(**DB_CONFIG)
#         cursor = conn.cursor()
        
#         sql = """INSERT IGNORE INTO companies (company_name, industry_sector, email, country, created_at, updated_at) 
#                  VALUES (%s, %s, %s, %s, NOW(), NOW())"""
        
#         for item in data:
#             if not all(key in item for key in ['company_name', 'email', 'industry_sector', 'country']):
#                 print(f"DEBUG DB: élément ignoré, clés manquantes -> {item}")
#                 continue

#             if not item['email'] or not item['email'].strip():
#                 print(f"DEBUG DB: élément ignoré, email manquant -> {item}")
#                 continue

#             cursor.execute(sql, (
#                 item['company_name'],
#                 item['industry_sector'],
#                 item['email'],
#                 item['country']
#             ))
#             if cursor.rowcount == 1:
#                 inserted_count += 1

#         conn.commit()
#         print(f"--- {inserted_count} entreprises ajoutées avec succès.")
#         cursor.close()
#         conn.close()
#     except Exception as e:
#         print(f"Erreur Database: {e}")


# def start_companies_scraping():
#     """Boucle principale de recherche d'entreprises"""
#     search_count = 0

#     for country in COUNTRIES_AR:
#         for sector in INDUSTRY_SECTORS:
#             if MAX_SEARCH_QUERIES is not None and search_count >= MAX_SEARCH_QUERIES:
#                 print(f"DEBUG STOP: limite de {MAX_SEARCH_QUERIES} recherches atteinte. Le script s'arrête.")
#                 return

#             search_count += 1
#             print(f"\nRecherche {search_count}/{MAX_SEARCH_QUERIES or '∞'} : {sector} en/au {country}...")
#             english_sector = INDUSTRY_SECTORS_EN.get(sector, sector)
#             search_query = f"{english_sector} {country} company contact email"

#             search_results = get_duckduckgo_search_results(search_query, country, sector)
#             if not search_results:
#                 print(f"DEBUG SCRAP: aucun résultat DuckDuckGo pour {country} / {sector}")
#                 time.sleep(5 + random.uniform(1, 3))
#                 continue

#             source_text = f"Recherche: {search_query}\n"
#             for item in search_results:
#                 source_text += f"Titre: {item['title']}\nURL: {item['url']}\nSnippet: {item['snippet']}\n"
#                 page_text = fetch_page_text(item['url'])
#                 if page_text:
#                     source_text += f"Contenu page: {page_text}\n"

#             if len(source_text) > 18000:
#                 source_text = source_text[:18000]

#             companies = get_companies_from_ai(source_text, country, sector)
#             print(f"DEBUG SCRAP: {len(companies)} entreprises extraites pour {sector} / {country}")
#             if not companies:
#                 print(f"DEBUG SCRAP: aucune entreprise trouvée pour {sector} / {country}")
#             else:
#                 save_companies_to_db(companies, default_country=country)

#             time.sleep(5 + random.uniform(1, 3))

#     print(f"\nFIN: {search_count} recherches effectuées.")


# if __name__ == "__main__":
#     start_companies_scraping()


















import requests
import mysql.connector
import re
import time
import random
from bs4 import BeautifulSoup
import openai

# ================= CONFIG =================
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

SERPER_API_KEY = os.environ["SERPER_API_KEY"]

DB_CONFIG = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "user": os.environ.get("DB_USERNAME", "root"),
    "password": os.environ.get("DB_PASSWORD", ""),
    "database": os.environ.get("DB_DATABASE", "platform_industry")
}


COUNTRIES = [
    "الأردن", "الإمارات", "البحرين", "تونس", "الجزائر", "جيبوتي", 
    "السعودية", "السودان", "سوريا", "الصومال", "العراق", "عمان", 
    "فلسطين", "قطر", "الكويت", "لبنان", "ليبيا", "مصر", "المغرب", 
    "موريتانيا", "اليمن"
]

SECTORS = {
    "الطاقة المتجددة": "renewable energy",
    "البناء والإنشاءات": "construction",
    "الصناعات الغذائية": "food industry",
    "السيارات": "automotive"
}

MAX_SEARCH = 20

# ================= SEARCH =================
def search_google(query):
    url = "https://google.serper.dev/search"

    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }

    res = requests.post(url, json={"q": query}, headers=headers)
    data = res.json()

    results = []

    for r in data.get("organic", []):
        results.append({
            "title": r.get("title"),
            "url": r.get("link"),
            "snippet": r.get("snippet")
        })

    return results


# ================= CRAWLER =================
def crawl_site(url):
    pages = [
        url,
        url.rstrip("/") + "/contact",
        url.rstrip("/") + "/about",
        url.rstrip("/") + "/contact-us"
    ]

    text = ""

    headers = {"User-Agent": "Mozilla/5.0"}

    for p in pages:
        try:
            res = requests.get(p, headers=headers, timeout=10)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, "html.parser")

                for tag in soup(["script", "style"]):
                    tag.extract()

                text += " ".join(soup.stripped_strings) + "\n"

        except:
            pass

    return text


# ================= EMAIL EXTRACTION =================
def extract_emails(text):
    return list(set(re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)))


# ================= AI CLEANER =================
def clean_company(name, email, sector, country):
    openai.api_key = OPENAI_API_KEY

    prompt = f"""
    Clean and validate this company data.

    Return JSON only:
    {{
        "company_name": "{name}",
        "email": "{email}",
        "industry_sector": "{sector}",
        "country": "{country}"
    }}
    """

    try:
        res = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )

        return res.choices[0].message.content

    except:
        return None


# ================= DB =================
def save_to_db(company):
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        sql = """
        INSERT IGNORE INTO companies
        (company_name, industry_sector, email, country, created_at, updated_at)
        VALUES (%s, %s, %s, %s, NOW(), NOW())
        """

        cursor.execute(sql, (
            company["company_name"],
            company["industry_sector"],
            company["email"],
            company["country"]
        ))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print("DB ERROR:", e)


# ================= PROCESS COMPANY =================
def process(url, title, sector, country):
    print("Scraping:", url)

    text = crawl_site(url)

    emails = extract_emails(text)

    email = emails[0] if emails else None

    if not email:
        return None

    company = {
        "company_name": title,
        "email": email,
        "industry_sector": sector,
        "country": country
    }

    return company


# ================= MAIN =================
def run():
    count = 0

    for country in COUNTRIES:
        for sector_ar, sector_en in SECTORS.items():

            if count >= MAX_SEARCH:
                print("STOP LIMIT")
                return

            count += 1

            print(f"\nSearch {count}: {sector_ar} - {country}")

            query = f"{sector_en} companies in {country}"

            results = search_google(query)

            if not results:
                print("No results")
                continue

            for r in results:

                company = process(
                    r["url"],
                    r["title"],
                    sector_ar,
                    country
                )

                if company:
                    print("FOUND:", company)
                    save_to_db(company)

            time.sleep(random.uniform(3, 6))


# ================= RUN =================
if __name__ == "__main__":
    run()