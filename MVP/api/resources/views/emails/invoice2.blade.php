<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <link rel="stylesheet" href="{{ asset('pdf/pdf.css') }}" type="text/css">
</head>
<body>
<section>
    <div class="invoice">
        <div class="top_line"></div>
        <div class="header">
            <div class="i_row">
                <div class="i_logo">
                    <p>LOGO</p>
                </div>
                <div class="i_title">
                    <h2>INVOICE</h2>
                    <p class="p_title text_right">{{ $date }}</p>
                </div>
            </div>
            <div class="i_row">
                <div class="i_number">
                    <p class="p_title">INVOICE NO: {{ $invoice_number }}</p>
                </div>
                <div class="i_address text_right">
                    <p>TO</p>
                    <p class="p_title">
                        {{ $client_name }} <br />
                        <span>{{ $client_address }}</span><br />
                        <span>{{ $client_country }}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="i_table">
                <div class="i_table_head">
                    <div class="i_row">
                        <div class="i_col w_15">
                            <p class="p_title">Service</p>
                        </div>
                        <div class="i_col w_55">
                            <p class="p_title">Description</p>
                        </div>
                        <div class="i_col w_15">
                            <p class="p_title">PRICE</p>
                        </div>
                        <div class="i_col w_15">
                            <p class="p_title">Amount</p>
                        </div>
                    </div>
                </div>
                <div class="i_table_body">
                    @foreach ($items as $item)
                        <div class="i_row">
                            <div class="i_col w_15">
                                <p>{{ $item['Service'] }}</p>
                            </div>
                            <div class="i_col w_55">
                                <p>{{ $item['description'] }}</p>
                                <span>{{ $item['details'] }}</span>
                            </div>
                            <div class="i_col w_15">
                                <p>${{ number_format($item['price'], 2) }}</p>
                            </div>
                            <div class="i_col w_15">
                                <p>${{ number_format($item['amount'], 2) }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="i_table_foot">
                    <div class="i_row">
                        <div class="i_col w_15"></div>
                        <div class="i_col w_55"></div>
                        <div class="i_col w_15">
                            <p>Sub Total</p>
                            <p>Tax 10%</p>
                        </div>
                        <div class="i_col w_15">
                            <p>${{ number_format($subtotal, 2) }}</p>
                            <p>${{ number_format($tax, 2) }}</p>
                        </div>
                    </div>
                    <div class="i_row grand_total_wrap">
                        <div class="i_col w_50"></div>
                        <div class="i_col w_50 grand_total">
                            <p><span>GRAND TOTAL:</span>
                                <span>${{ number_format($grand_total, 2) }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="i_row">
                <div class="i_col w_50">
                    <p class="p_title">Payment Method</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, dicta distinctio! Laudantium voluptatibus est nemo.</p>
                </div>
                <div class="i_col w_50 text_right">
                    <p class="p_title">Terms and Conditions</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, dicta distinctio! Laudantium voluptatibus est nemo.</p>
                </div>
            </div>
        </div>
        <div class="bottom_line"></div>
    </div>
</section>
</body>
</html>
