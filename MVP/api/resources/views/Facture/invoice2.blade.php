<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Redressed&family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
    <title>Invoice</title>
    <link rel="stylesheet" href="{{ public_path('pdf/pdf2.css') }}">
</head>
<body>
<section>
    <div class="invoice">
        <div class="invoice_info">
            <div class="i_row">
                <div class="i_logo">
                    <h1>LOGO</h1>
                </div>
                <div class="title">
                    <h1>INVOICE</h1>
                </div>
            </div>
            <div class="i_row">
                <div class="i_to">
                    <div class="main_title">
                        <p>Invoice To</p>
                    </div>
                    <div class="p_title">
                        <p>{{ $data['invoice']['client_details']['name'] }}</p>
                        <p>{{ $data['invoice']['client_details']['address'] }}</p>
                        <p>{{ $data['invoice']['client_details']['postal_code'] }}</p>
                        <p>{{ $data['invoice']['client_details']['country'] }}</p>
                    </div>

                </div>
                <div class="i_details text_right">
                    <div class="main_title">
                        <p>Invoice details</p>
                    </div>
                    <div class="p_title">
                        <p>Invoice No:</p>
                        <span>{{ $data['invoice']['invoice_number'] }}</span>
                    </div>
                    <div class="p_title">
                        <p>Invoice Date:</p>
                        <span>{{ \Carbon\Carbon::now()->format('d F Y') }}</span>
                    </div>
                </div>
            </div>
            <div class="i_row">
                <div class="i_payment">
                    <div class="main_title">
                        <p>Pay To</p>
                    </div>
                    <div class="p_title">
                        <p>{{ $data['invoice']['company_details']['name'] }}</p>
                        <p>{{ $data['invoice']['company_details']['address'] }}</p>
                        <p>{{ $data['invoice']['company_details']['postal_code'] }}</p>
                        <p>{{ $data['invoice']['company_details']['email'] }}</p>
                    </div>

                </div>
                <div class="i_duetotal text_right">
                    <div class="main_title">
                        <p>Total Due</p>
                    </div>
                    <div class="p_title">
                        <p>Total Invoice:</p>
                        <span>{{ $data['invoice']['totals']['total'] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="invoice_table">
            <div class="i_table">
                <div class="i_table_head">
                    <div class="i_row">
                        <div class="i_col w_55">
                            <p class="p_title">DESCRIPTION</p>
                        </div>
                        <div class="i_col w_15 text_center">
                            <p class="p_title">QTY</p>
                        </div>
                        <div class="i_col w_15 text_center">
                            <p class="p_title">PRICE</p>
                        </div>
                        <div class="i_col w_15 text_right">
                            <p class="p_title">AMOUNT</p>
                        </div>
                    </div>
                </div>
                <div class="i_table_body">
                    @foreach ($data['invoice']['items'] as $item)
                        <div class="i_row">
                            <div class="i_col w_55">
                                <p>{{ $item['description'] }}</p>
                            </div>
                            <div class="i_col w_15 text_center">
                                <p>{{ $item['quantity'] }}</p>
                            </div>
                            <div class="i_col w_15 text_center">
                                <p>{{ $item['rate'] }}$</p>
                            </div>
                            <div class="i_col w_15 text_right">
                                <p>{{ $item['amount'] }}$</p>
                            </div>
                        </div>
                    @endforeach
                    <!-- Repeat similar rows as needed -->
                </div>
                <div class="i_table_foot">
                    <div class="i_row">
                        <div class="i_col w_50">
                            <p>Sub Total</p>
                            <p>Tax </p>
                        </div>
                        <div class="i_col w_50 text_right">
                            <p>{{ $data['invoice']['totals']['subtotal'] }}$</p>
                            <p>{{ $data['invoice']['totals']['tax'] }}%</p>
                        </div>
                    </div>
                    <div class="i_row grand_total_wrap">
                        <div class="i_col w_50">
                            <p>GRAND TOTAL:</p>
                        </div>
                        <div class="i_col w_50 text_right">
                            <p>{{ $data['invoice']['totals']['total'] }}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="invoice_terms">
            <div class="main_title">
                <p>Terms and Conditions</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nemo eligendi inventore? Provident iste cumque quam eaque consequatur architecto, consequuntur molestiae? Corporis, voluptates? Fugit, omnis.</p>
        </div>
    </div>
</section>
</body>
</html>
