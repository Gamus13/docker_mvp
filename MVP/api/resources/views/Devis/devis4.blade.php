<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <link rel="stylesheet" href="{{ public_path('pdf/pdfquote.css') }}" type="text/css">
</head>
<body>

<table class="table-no-border">
    <tr>
        <td class="width-70">
            {{-- <img src="{{ public_path('itsolutionstuff.png') }}" alt="" width="200" /> --}}
            LOGO
        </td>
        <td class="width-30">
            <h2>Invoice ID: 3</h2>
        </td>
    </tr>
</table>

<div class="margin-top">
    <table class="table-no-border">
        <tr>
            <td class="width-50">
                <div><strong>To:</strong></div>
                <div>{{ $data['quote']['company_details']['name'] }}</div>
                <div>{{ $data['quote']['company_details']['address'] }}</div>
                <div><strong>Phone:</strong></div>
                <div><strong>Postal code:</strong> {{ $data['quote']['company_details']['postal_code'] }}</div>
            </td>
            <td class="width-50">
                <div><strong>From:</strong></div>
                <div>{{ $data['quote']['client_details']['name'] }}</div>
                <div>{{ $data['quote']['client_details']['address'] }}</div>
                <div><strong>Phone:</strong> </div>
                <div><strong>Email:</strong> @if(isset($quote['client_details']['email']))
                    {{ $quote['client_details']['email'] }}
                @else
                    <p>Email non fourni.</p>
                @endif</div>
            </td>
        </tr>
    </table>
</div>

<div>
    <table class="product-table">
        <thead>
            <tr>
                <th class="width-50">
                    <strong>Product</strong>
                </th>
                <th class="width-25">
                    <strong>TVA</strong>
                </th>
                <th class="width-25">
                    <strong>Total HT</strong>
                </th>
                <th class="width-25">
                    <strong>Total TTC</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($data['quote']['items'] as $value)
            <tr>
                <td class="width-50">
                    {{ $value['description'] }}
                </td>
                <td class="width-25">
                    {{ $value['tva'] }}
                </td>
                <td class="width-25">
                    {{ $value['total_ht'] }}
                </td>
                <td class="width-25">
                    {{ $value['total_ttc'] }}
                </td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td class="width-70" colspan="3">
                    <strong>Sub Total:</strong>
                </td>
                <td class="width-25">
                    <strong>{{ $data['quote']['totals']['total_ht'] }}</strong>
                </td>
            </tr>
            <tr>
                <td class="width-70" colspan="3">
                    <strong>Tax</strong>(10%):
                </td>
                <td class="width-25">
                    <strong>{{ $data['quote']['totals']['tva_total'] }}</strong>
                </td>
            </tr>
            <tr>
                <td class="width-70" colspan="3">
                    <strong>Total Amount:</strong>
                </td>
                <td class="width-25">
                    <strong>{{ $data['quote']['totals']['total_ttc'] }}</strong>
                </td>
            </tr>
        </tfoot>
    </table>
</div>

<div class="footer-div">
    <p>Thank you, <br/>Docxtalk</p>
</div>

</body>
</html>
