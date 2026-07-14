import { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Eye, EyeOff, HelpCircle, LoaderCircle, Save, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Status = 'pending' | 'answered' | 'hidden';

type FaqQuestion = {
    id: number;
    name: string | null;
    email: string | null;
    question: string;
    answer: string | null;
    status: Status;
    is_published: boolean;
    created_at: string;
};

type PaginatedResponse = {
    data: FaqQuestion[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'الأسئلة الشائعة', href: '/admin/faq' },
];

const filters: Array<{ label: string; value: Status | 'all' }> = [
    { label: 'الكل', value: 'all' },
    { label: 'في الانتظار', value: 'pending' },
    { label: 'تمت الإجابة', value: 'answered' },
    { label: 'مخفي', value: 'hidden' },
];

const statusLabels: Record<Status, string> = {
    pending: 'في الانتظار',
    answered: 'تمت الإجابة',
    hidden: 'مخفي',
};

function csrfToken() {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
}

export default function FaqAdmin() {
    const [questions, setQuestions] = useState<FaqQuestion[]>([]);
    const [filter, setFilter] = useState<Status | 'all'>('all');
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const url = useMemo(() => {
        const params = new URLSearchParams({ per_page: '100' });

        if (filter !== 'all') {
            params.set('status', filter);
        }

        return `/admin/faqs?${params.toString()}`;
    }, [filter]);

    useEffect(() => {
        setLoading(true);
        fetch(url, {
            headers: { Accept: 'application/json' },
        })
            .then((response) => response.json())
            .then((data: PaginatedResponse) => setQuestions(data.data ?? []))
            .catch(() => setMessage('تعذر تحميل الأسئلة.'))
            .finally(() => setLoading(false));
    }, [url]);

    const updateQuestion = (id: number, changes: Partial<FaqQuestion>) => {
        setQuestions((current) =>
            current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
        );
    };

    const saveQuestion = async (item: FaqQuestion) => {
        setSavingId(item.id);
        setMessage('');

        try {
            const response = await fetch(`/admin/faqs/${item.id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                },
                body: JSON.stringify({
                    answer: item.answer ?? '',
                    status: item.status,
                    is_published: item.is_published,
                }),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            updateQuestion(item.id, data.data);
            setMessage('تم حفظ التغييرات.');
        } catch {
            setMessage('تعذر حفظ السؤال.');
        } finally {
            setSavingId(null);
        }
    };

    const deleteQuestion = async (id: number) => {
        if (!window.confirm('هل تريد حذف هذا السؤال؟')) {
            return;
        }

        setSavingId(id);
        setMessage('');

        try {
            const response = await fetch(`/admin/faqs/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                },
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            setQuestions((current) => current.filter((item) => item.id !== id));
            setMessage('تم حذف السؤال.');
        } catch {
            setMessage('تعذر حذف السؤال.');
        } finally {
            setSavingId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="الأسئلة الشائعة" />
            <div dir="rtl" className="flex flex-1 flex-col gap-5 p-4">
                <div className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-5 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HelpCircle className="size-4" />
                            إدارة المحتوى
                        </div>
                        <h1 className="text-2xl font-semibold tracking-normal">
                            الأسئلة الشائعة
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filters.map((item) => (
                            <Button
                                key={item.value}
                                type="button"
                                variant={filter === item.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(item.value)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {message && (
                    <p className="rounded-md border bg-secondary px-4 py-3 text-sm">
                        {message}
                    </p>
                )}

                {loading ? (
                    <div className="flex items-center gap-2 rounded-lg border p-6 text-sm text-muted-foreground">
                        <LoaderCircle className="size-4 animate-spin" />
                        جار تحميل الأسئلة...
                    </div>
                ) : questions.length > 0 ? (
                    <div className="grid gap-4">
                        {questions.map((item) => (
                            <Card key={item.id} className="rounded-lg">
                                <CardHeader className="gap-3">
                                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge variant={item.status === 'answered' ? 'default' : 'secondary'}>
                                                    {statusLabels[item.status]}
                                                </Badge>
                                                <Badge variant={item.is_published ? 'outline' : 'secondary'}>
                                                    {item.is_published ? 'منشور' : 'غير منشور'}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-base leading-7">
                                                {item.question}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {item.name || 'زائر'} {item.email ? `- ${item.email}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <textarea
                                        value={item.answer ?? ''}
                                        onChange={(event) => updateQuestion(item.id, { answer: event.target.value })}
                                        placeholder="اكتب جواب الإدارة هنا"
                                        className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    />

                                    <div className="grid gap-3 md:grid-cols-[180px_1fr_auto] md:items-center">
                                        <select
                                            value={item.status}
                                            onChange={(event) =>
                                                updateQuestion(item.id, { status: event.target.value as Status })
                                            }
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                        >
                                            <option value="pending">في الانتظار</option>
                                            <option value="answered">تمت الإجابة</option>
                                            <option value="hidden">مخفي</option>
                                        </select>

                                        <Button
                                            type="button"
                                            variant={item.is_published ? 'outline' : 'secondary'}
                                            onClick={() => updateQuestion(item.id, { is_published: !item.is_published })}
                                        >
                                            {item.is_published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            {item.is_published ? 'إلغاء النشر' : 'نشر السؤال'}
                                        </Button>

                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                onClick={() => saveQuestion(item)}
                                                disabled={savingId === item.id}
                                            >
                                                {savingId === item.id ? (
                                                    <LoaderCircle className="size-4 animate-spin" />
                                                ) : (
                                                    <Save className="size-4" />
                                                )}
                                                حفظ
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => deleteQuestion(item.id)}
                                                disabled={savingId === item.id}
                                            >
                                                <Trash2 className="size-4" />
                                                حذف
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                        لا توجد أسئلة في هذا التصنيف.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
