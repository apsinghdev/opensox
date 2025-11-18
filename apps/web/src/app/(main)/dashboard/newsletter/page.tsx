"use client";

import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { newsletterposts } from "@/data/newsletter";
import { ChangeEvent, InputEventHandler, useEffect, useRef, useState } from "react";
import { getMonthYearOptions } from "@/utils/converter";
import Image from "next/image";

interface NewsletterCardProps {
    id: number;
    title: string;
    date: string;
    tags: string[];
    content: string;
}
interface NewsletterLockedProps {
    isPaidUser: boolean;
}

function NewsletterCard({ id, title, date, tags, content }: NewsletterCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-ox-purple bg-ox-purple/20 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden">
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-grow">
                    {content.replace(/<[^>]*>?/gm, "").slice(0, 200)}…
                </p>

            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <Link
                    href={`/dashboard/newsletter/${id}`}
                    className="text-ox-purple-2 text-sm font-medium hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
}

export default function Newsletter() {
    const { isPaidUser } = useSubscription();
    const [searchval, setsearchval] = useState('');
    const [newsletteritems, setNewsletterItems] = useState(newsletterposts);
    const [loading, setLoading] = useState(false);
    const [months, setMonths] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [selectedfilter, setSelectedFilter] = useState({
        month: '',
        year: '',
    })

    useEffect(() => {
        if (Array.isArray(newsletterposts) && newsletterposts.length) {
            const { month, year } = getMonthYearOptions(newsletterposts) || { month: [], year: [] };
            setMonths(month);
            setYears(year);
        }
    }, [newsletterposts]);

    useEffect(() => {
        if (!searchval.length) {
            setNewsletterItems(newsletterposts);
            return;
        }
        setLoading(true);
        let timeoutId = setTimeout(() => {
            const updatedItems = newsletteritems.filter(item => item.title.toLowerCase().includes(searchval.toLocaleLowerCase()));
            setNewsletterItems(updatedItems);
            setLoading(false);
        }, 2000);
        return (() => clearTimeout(timeoutId))
    }, [searchval]);

    useEffect(() => {
        let filteredItem = [...newsletterposts];
        if (selectedfilter.month) {
            filteredItem = filteredItem.filter(item => {
                if (new Date(item.date).toLocaleDateString('default', { month: 'long' }).toLowerCase() === selectedfilter.month.toLowerCase()) {
                    return item;
                }
            })
        }
        if (selectedfilter.year) {
            filteredItem = filteredItem.filter(item => {
                if (new Date(item.date).getFullYear() === Number(selectedfilter.year)) {
                    return item;
                }
            })
        }
        setNewsletterItems(filteredItem);
    }, [selectedfilter]);

    if (!isPaidUser) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-ox-purple dark:bg-ox-purple mb-6">
                    <LockClosedIcon className="h-8 w-8 text-white-600 dark:text-white-300" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Newsletter Locked
                </h2>

                <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                    You need a <span className="font-medium text-gray-900 dark:text-gray-100">paid membership</span> to access the newsletter section.
                    Upgrade your plan to unlock exclusive content, insights, and member-only posts.
                </p>

                <Button
                    className="font-bold text-sm flex hover:bg-white-500 text-white bg-ox-purple cursor-pointer p-3 h-7 md:p-auto md:h-auto">

                    <Link
                        href="/pricing"
                    >
                        View Pricing
                    </Link>
                </Button>
            </div>
        );
    }
    return (
        <div className=" p-8">
            <input type="text"
                placeholder="Search newsletter..."
                name="searchNewsletter"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setsearchval(event.target?.value.trim())}
                className="w-full px-4 py-2 border border-2 border-ox-header rounded-lg focus:outline-none focus:ring-2 focus:ring-ox-purple mb-6 bg-ox-content text-foreground" />
            <div className="flex gap-4 mb-4">
                <select
                    className="border rounded p-2 bg-ox-black-2"
                    value={selectedfilter?.month || ''}
                    onChange={(e) => setSelectedFilter(prev => ({
                        ...prev,
                        month: e.target.value
                    }))}
                >
                    <option value="">All Months</option>
                    {months
                        .sort((a: string, b: string) => Number(a) - Number(b))
                        .map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                </select>
                <select
                    className="border rounded p-2 bg-ox-black-2"
                    value={selectedfilter?.year || ''}
                    onChange={(e) => setSelectedFilter(prev => ({
                        ...prev,
                        year: e.target.value,
                    }))}
                >
                    <option value="">All Years</option>
                    {years
                        .sort((a, b) => a - b)
                        .map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                </select>
            </div>
            {loading && (
                <div className="justify-center text-2xl flex items-center gap-3 mt-4">
                    <div className="h-5 w-5 border-2 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground">Searching...</p>
                </div>
            )}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {!loading && newsletteritems.map((post) => (
                    <NewsletterCard key={post.id} {...post} />
                ))}
            </div>
        </div>
    )
}
