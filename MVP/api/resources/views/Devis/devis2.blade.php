<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Redressed&family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
    <title>Invoice</title>
    <link rel="stylesheet" href="{{ asset('pdf/pdfdevis2.css') }}" type="text/css">
</head>
<body>

    <section>
        <div class="invoice">
          <div class="invoice_left">
            <div class="i_logo">
              <p>Logo</p>
            </div>
            <div class="i_to">
              <div class="main_title">
                <p>Quote To</p>
                <div class="divider"></div>
              </div>
              <div class="p_title">
                <p>Alex Green</p>
                <span>Team Lead</span>
              </div>
              <div class="p_title">
                <p>10 Woods Cross</p>
                <p>Texas, USA</p>
              </div>
            </div>
            <div class="i_details">
              <div class="main_title">
                <p>Quote details</p>
                <div class="divider"></div>
              </div>
              <div class="p_title">
                <p>Invoice No:</p>
                <span>3452356</span>
              </div>
              <div class="p_title">
                <p>Invoice Date:</p>
                <span>22 April 2023</span>
              </div>
            </div>
            <div class="i_payment">
              <div class="main_title">
                <p>Payment Method</p>
                <div class="divider"></div>
              </div>
              <div class="p_title">
                <p>Paypal:</p>
                <span>paypal@yourcompany.com</span>
              </div>
              <div class="p_title">
                <p>Card Payment:</p>
                <span>Visa, MasterCard, Paypal</span>
              </div>
            </div>
            <div class="i_duetotal">
              <div class="main_title">
                <p>Total Due</p>
                <div class="divider"></div>
              </div>
              <div class="p_title">
                <p>Amout In USD:</p>
                <span>$150.00</span>
              </div>
            </div>
          </div>
          <div class="invoice_right">
            <div class="title">
              <h1>Quote</h1>
              <div class="divider"></div>
            </div>
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
                    <p class="p_title">TOTAL</p>
                  </div>
                </div>
              </div>
              <div class="i_table_body">
                <div class="i_row">
                  <div class="i_col w_55">
                    <p>Lorem, ipsum.</p>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.</span>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>3</p>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>$10.00</p>
                  </div>
                  <div class="i_col w_15 text_right">
                    <p>$30.00</p>
                  </div>
                </div>
                <div class="i_row">
                  <div class="i_col w_55">
                    <p>Lorem, ipsum.</p>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.</span>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>5</p>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>$10.00</p>
                  </div>
                  <div class="i_col w_15 text_right">
                    <p>$50.00</p>
                  </div>
                </div>
                <div class="i_row">
                  <div class="i_col w_55">
                    <p>Lorem, ipsum.</p>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.</span>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>7</p>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>$10.00</p>
                  </div>
                  <div class="i_col w_15 text_right">
                    <p>$70.00</p>
                  </div>
                </div>
                <div class="i_row">
                  <div class="i_col w_55">
                    <p>Lorem, ipsum.</p>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.</span>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>13</p>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>$10.00</p>
                  </div>
                  <div class="i_col w_15 text_right">
                    <p>$130.00</p>
                  </div>
                </div>
                <div class="i_row">
                  <div class="i_col w_55">
                    <p>Lorem, ipsum.</p>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.</span>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>3</p>
                  </div>
                  <div class="i_col w_15 text_center">
                    <p>$100.00</p>
                  </div>
                  <div class="i_col w_15 text_right">
                    <p>$300.00</p>
                  </div>
                </div>
              </div>
              <div class="i_table_foot">
                <div class="i_row">
                  <div class="i_col w_50">
                    <p>Sub Total</p>
                    <p>Due Total</p>
                    <p>Tax 10%</p>
                  </div>
                  <div class="i_col w_50 text_right">
                    <p>$580.00</p>
                    <p>$150.00</p>
                    <p>$15.00</p>
                  </div>
                </div>
                <div class="i_row grand_total_wrap">
                  <div class="i_col w_50">
                    <p>GRAND TOTAL:</p>
                  </div>
                  <div class="i_col w_50 text_right">
                    <p>$745.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="terms">
              <div class="main_title">
                <p>terms and Conditions</p>
                <div class="divider"></div>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nemo eligendi inventore? Provident iste cumque quam eaque consequatur architecto, consequuntur molestiae? Corporis, voluptates? Fugit, omnis.</p>
            </div>
          </div>
        </div>
      </section>
</body>
</html>
