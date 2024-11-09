<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice</title>
    <link rel="stylesheet" href="{{ public_path('pdf/pdfinvoice4.css') }}" media="all" />
</head>
<body>
    <header class="clearfix">
        <div id="logo">
            LOGO
        </div>
        <h1>INVOICE {{ $data['invoice']['invoice_number'] }}</h1>
        <div id="company" class="clearfix">
            <div>{{ $data['invoice']['company_details']['name'] }}</div>
            <div>{{ $data['invoice']['company_details']['address'] }},<br /> {{ $data['invoice']['company_details']['postal_code'] }}</div>
            <div>(602) 519-0450</div>
            <div><a href="mailto:{{ $data['invoice']['company_details']['email'] }}">{{ $data['invoice']['company_details']['email'] }}</a></div>
        </div>
        <div id="project">
            <div><span>PROJECT</span> Website development</div>
            <div><span>CLIENT</span> {{ $data['invoice']['client_details']['name'] }}</div>
            <div><span>ADDRESS</span> {{ $data['invoice']['client_details']['address'] }}</div>
            <div><span>EMAIL</span> <a href="mailto:{{ $data['invoice']['client_details']['email'] }}">{{ $data['invoice']['client_details']['email'] }}</a></div>
            <div><span>DATE</span> {{ \Carbon\Carbon::now()->format('F d, Y') }}</div>
            <div><span>DUE DATE</span> {{ \Carbon\Carbon::parse($data['invoice']['payment_details']['due_date'])->format('F d, Y') }}</div>
        </div>
    </header>
    <main>
        <table>
            <thead>
                <tr>
                    <th class="service">SERVICE</th>
                    <th class="desc">DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data['invoice']['items'] as $item)
                    <tr>
                        <td class="service">{{ $item['service'] }}</td>
                        <td class="desc">{{ $item['description'] }}</td>
                        <td class="unit">${{ number_format($item['rate'], 2) }}</td>
                        <td class="qty">{{ $item['quantity'] }}</td>
                        <td class="total">${{ number_format($item['amount'], 2) }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="4">SUBTOTAL</td>
                    <td class="total">${{ number_format($data['invoice']['totals']['subtotal'], 2) }}</td>
                </tr>
                <tr>
                    <td colspan="4">TAX 25%</td>
                    <td class="total">${{ number_format($data['invoice']['totals']['tax'], 2) }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="grand total">GRAND TOTAL</td>
                    <td class="grand total">${{ number_format($data['invoice']['totals']['total'], 2) }}</td>
                </tr>
            </tbody>
        </table>
        <div id="notices">
            <div>NOTICE:</div>
            <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
        </div>
    </main>
    <footer>
        Invoice was created on a computer and is valid without the signature and seal.
    </footer>
</body>
</html>
