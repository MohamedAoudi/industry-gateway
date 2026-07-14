import { FormEvent, useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, HelpCircle, LoaderCircle, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dashboard, login } from '@/routes';

type FaqQuestion = {
    id: number;
    question: string;
    answer: string;
};

type PaginatedResponse = {
    data: FaqQuestion[];
};

export default function Faq() {
    const { auth } = usePage().props;
    const [questions, setQuestions] = useState<FaqQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        question: '',
    });

    useEffect(() => {
        fetch('/api/faqs?per_page=100', {
            headers: { Accept: 'application/json' },
        })
            .then((response) => response.json())
            .then((data: PaginatedResponse) => setQuestions(data.data ?? []))
            .catch(() => setMessage('تعذر تحميل الأسئلة الشائعة حاليا.'))
            .finally(() => setLoading(false));
    }, []);

    const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/faqs', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            setForm({ name: '', email: '', question: '' });
            setMessage('تم إرسال سؤالك بنجاح. سيظهر بعد جواب الإدارة ونشره.');
        } catch {
            setMessage('تعذر إرسال السؤال، حاول مرة أخرى.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title="الأسئلة الشائعة" />
            <main dir="rtl" className="min-h-screen bg-background text-foreground">
                <header className="border-b bg-card">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-lg font-semibold">
                            بوابة الصناعة
                        </Link>
                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild variant="outline">
                                    <Link href={dashboard()}>لوحة التحكم</Link>
                                </Button>
                            ) : (
                                <Button asChild variant="outline">
                                    <Link href={login()}>تسجيل الدخول</Link>
                                </Button>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_380px]">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <HelpCircle className="size-4" />
                                مركز المساعدة
                            </div>
                            <h1 className="text-3xl font-semibold tracking-normal">
                                الأسئلة الشائعة
                            </h1>
                            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                                تجد هنا الأسئلة التي تمت الإجابة عنها من طرف الإدارة. يمكنك إرسال سؤال جديد وسيتم نشره بعد المراجعة.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <LoaderCircle className="size-4 animate-spin" />
                                جار تحميل الأسئلة...
                            </div>
                        ) : questions.length > 0 ? (
                            <div className="space-y-3">
                                {questions.map((item) => (
                                    <Card key={item.id} className="rounded-lg py-0">
                                        <CardContent className="space-y-3 p-5">
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                                                    <MessageCircle className="size-4" />
                                                </span>
                                                <div className="space-y-2">
                                                    <h2 className="font-semibold leading-7">
                                                        {item.question}
                                                    </h2>
                                                    <p className="text-sm leading-7 text-muted-foreground">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                                لا توجد أسئلة منشورة حاليا.
                            </div>
                        )}
                    </div>

                    <Card className="h-fit rounded-lg">
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <Send className="size-5" />
                                </div>
                                <h2 className="text-xl font-semibold">إرسال سؤال</h2>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    اكتب سؤالك وسيتم عرضه بعد أن تجيب عليه الإدارة.
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={submitQuestion}>
                                <Input
                                    value={form.name}
                                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                                    placeholder="الاسم"
                                />
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                                    placeholder="البريد الإلكتروني"
                                />
                                <textarea
                                    required
                                    value={form.question}
                                    onChange={(event) => setForm({ ...form, question: event.target.value })}
                                    placeholder="اكتب سؤالك هنا"
                                    className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                />
                                <Button className="w-full" disabled={submitting}>
                                    {submitting ? (
                                        <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="size-4" />
                                    )}
                                    إرسال السؤال
                                </Button>
                            </form>

                            {message && (
                                <p className="rounded-md bg-secondary px-3 py-2 text-sm leading-6">
                                    {message}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </section>

                <footer className="border-t bg-card">
                    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                        <span>بوابة الصناعة</span>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/">الرئيسية</Link>
                            <Link href="/faq">الأسئلة الشائعة</Link>
                            {auth.user ? (
                                <Link href={dashboard()}>لوحة التحكم</Link>
                            ) : (
                                <Link href={login()}>تسجيل الدخول</Link>
                            )}
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
