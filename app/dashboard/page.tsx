import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchInvoiceTotals } from '@/app/lib/data';

export default async function Page() {
    const [revenue, latestInvoices, invoiceTotals] = await Promise.all([
        fetchRevenue(),
        fetchLatestInvoices(),
        fetchInvoiceTotals()
    ])

    const {number_of_invoices, number_of_paid_invoices, number_of_pending_invoices, number_of_customers} = invoiceTotals;

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected" value={number_of_paid_invoices} type="collected" />
                <Card title="Pending" value={number_of_invoices} type="pending" />
                <Card title="Total Invoices" value={number_of_pending_invoices} type="invoices" />
                <Card
                    title="Total Customers"
                    value={number_of_customers}
                    type="customers"
                    />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue} />
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    );
}