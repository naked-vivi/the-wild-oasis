import type { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationPageProps {
    count: number;
    page: number;
    pageSize: number;
}

export function PaginationPage({ count, page, pageSize }: PaginationPageProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageCount = Math.ceil(count / pageSize);

    if (pageCount <= 1) return null;

    function pageParams(nextPage: number) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(nextPage));
        return params;
    }

    function linkProps(nextPage: number, disabled = false) {
        return {
            href: disabled ? undefined : `?${pageParams(nextPage)}`,
            "aria-disabled": disabled || undefined,
            tabIndex: disabled ? -1 : undefined,
            className: disabled ? "pointer-events-none opacity-50" : "cursor-pointer",
            onClick(event: MouseEvent<HTMLAnchorElement>) {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                setSearchParams(pageParams(nextPage));
            },
        };
    }

    const pages = [...new Set([1, page - 1, page, page + 1, pageCount])]
        .filter((value) => value >= 1 && value <= pageCount)
        .sort((a, b) => a - b);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious {...linkProps(page - 1, page <= 1)} />
                </PaginationItem>
                {pages.flatMap((value, index) => [
                    ...(index > 0 && value - pages[index - 1] > 1 ? [
                        <PaginationItem key={`ellipsis-${value}`}>
                            <PaginationEllipsis />
                        </PaginationItem>,
                    ] : []),
                    <PaginationItem key={value}>
                        <PaginationLink {...linkProps(value)} isActive={page === value} aria-label={`Go to page ${value}`}>
                            {value}
                        </PaginationLink>
                    </PaginationItem>,
                ])}
                <PaginationItem>
                    <PaginationNext {...linkProps(page + 1, page >= pageCount)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
