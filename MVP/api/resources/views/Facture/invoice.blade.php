<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Invoice</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- <link rel="stylesheet" href="{{ asset('pdf/pdf.css') }}" type="text/css"> --}}
    <link rel="stylesheet" href="{{ public_path('pdf/pdf.css') }}">

</head>
<body>

    <div class="invoice-wrapper" id="print-area">
        <div class="invoice">
            <div class="invoice-container">
                <div class="invoice-head">
                    <div class="invoice-head-top">
                        <div class="invoice-head-top-left text-start">
                            <p>Logo</p>
                        </div>
                        <div class="invoice-head-top-right text-end">
                            <h3>Invoice</h3>
                        </div>
                    </div>
                    <div class="hr"></div>
                    <div class="invoice-head-middle">
                        <div class="invoice-head-middle-left text-start">
                            <p><span class="text-bold">Date de facture</span>: {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
                        </div>
                        <div class="invoice-head-middle-right text-end">
                            <p><span class="text-bold">Invoice No:</span> {{ $data['invoice']['invoice_number'] }}</p>
                        </div>
                    </div>
                    <div class="hr"></div>
                    <div class="invoice-head-bottom">
                        <div class="invoice-head-bottom-left">
                            <ul>
                                <li class="text-bold">Invoiced To:</li>
                                <li>{{ $data['invoice']['client_details']['name'] }}</li>
                                <li>{{ $data['invoice']['client_details']['address'] }}</li>
                                <li>{{ $data['invoice']['client_details']['postal_code'] }}</li>
                                <li>{{ $data['invoice']['client_details']['country'] }}</li>
                            </ul>
                        </div>
                        <div class="invoice-head-bottom-right">
                            <ul class="text-end">
                                <li class="text-bold">Pay To:</li>
                                <li>{{ $data['invoice']['company_details']['name'] }}</li>
                                <li>{{ $data['invoice']['company_details']['address'] }}</li>
                                <li>{{ $data['invoice']['company_details']['postal_code'] }}</li>
                                <li>{{ $data['invoice']['company_details']['email'] }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="overflow-view">
                    <div class="invoice-body">
                        <table>
                            <thead>
                                <tr>
                                    <td class="text-bold">Service</td>
                                    <td class="text-bold">Description</td>
                                    <td class="text-bold">Rate</td>
                                    <td class="text-bold">QTY</td>
                                    <td class="text-bold text-end">Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data['invoice']['items'] as $item)
                                    <tr>
                                        <td>{{ $item['service'] }}</td>
                                        <td>{{ $item['description'] }}</td>
                                        <td>{{ $item['rate'] }}$</td>
                                        <td>{{ $item['quantity'] }}</td>
                                        <td class="text-end">{{ $item['amount'] }}$</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <div class="invoice-body-bottom">
                            <div class="invoice-body-info-item border-bottom">
                                <div class="info-item-td text-end text-bold">Sub Total(excl. tax):</div>
                                <div class="info-item-td text-end">{{ $data['invoice']['totals']['subtotal'] }}$</div>
                            </div>
                            <div class="invoice-body-info-item border-bottom">
                                <div class="info-item-td text-end text-bold">Tax:</div>
                                <div class="info-item-td text-end">{{ $data['invoice']['totals']['tax'] }}%</div>
                            </div>
                            <div class="invoice-body-info-item">
                                <div class="info-item-td text-end text-bold">Total (incl. tax):</div>
                                <div class="info-item-td text-end">{{ $data['invoice']['totals']['total'] }}$</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="invoice-foot text-center">
                    <p><span class="text-bold">NOTE:&nbsp;</span>This is a computer-generated receipt and does not require a physical signature.</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
