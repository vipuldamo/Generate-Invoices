<html>
	<body>
		<div id="form-container">
			<div class="input_fields_container">
				<form method = "post" class ="inputForm">
					<label>Product:</label><input type="text" name="product" id="prod1" class="change-field new" data-did="1">
					<label>Quantity:</label><input type="number" name="quantity" id="qty1" class="change-field new" data-did="1">
					<label>Unit price:</label><input type="number" name="price" id="prz1" class="change-field new" data-did="1">
					<label>Tax:</label>
					<select name="tax" id="tax1" form="carform" class="change-field new" data-did="1">
					  <option value="0">0%</option>
					  <option value="1">1%</option>
					  <option value="5">5%</option>
					  <option value="10">10%</option>
					</select>
					<label>Total:</label><input dissable type="text" name="total" id="ttl1" disabled>
					<input type="hidden" name="total" id="wtax1">
				</form>
				<button id="addMore">Add</button> <button id="print">Print</button>
			</div>
			
			<br><label>Sub Total Wihout tax:</label><span id="total-without-tax"></span>
			<br/><label>Sub Total Wih tax:</label><span id="total-with-tax"></span>
			<br/><label>Total:</label><span id="grand-total"></span>
			<br><lable>Disscount</lable><select id="discTerm"><option value="1">Price</option><option value="2">Persentage</option></select>
			<input type="text" name="dicVal" id="dicVal"><button id="addDisc">Add discount</button>
		</div>

		<table border="1px" id="showTable" style="display: none; margin-left: auto; margin-right: auto;">
			<tr>
				<th colspan="5">INVOICE</th>
			</tr>
			<tr>
				<th>Product</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Tax</th>
				<th>Total</th>
			</tr>
			<tbody id="table-content">

			</tbody>
			<tr>
				<td>Sub Total With Tax</td>
				<td id="disp-ttotal"></td>
				<td>Sub Total Without Tax</td>
				<td id="disp-total" colspan="2"></td>
			</tr>
			<tr>
				<td olspan="2">Total</td>
				<td colspan="4" id="disp-grand-total"></td>
			</tr>
		</table>
		
	</body>
</html>

<script src="jQuery.js"></script>
<script src="app.js"></script>
<style>
input{border: 1px solid #00000052;
    height: 25px;
    border-radius: 3px;margin-right: 15px;
    margin-bottom: 10px;}
.new{
	margin-right: 10px;
}
select{
	margin-right: 16px;
}
.input_fields_container{
	display: inline-block;
    position: relative;
}
.addButton{
	position: absolute;
    right: -99px;
    top: 0;
}
button#addMore {
    position: absolute;
    right: -36px;
    top: 0;
}
button#print {
    position: absolute;
    right: -90px;
    top: 0;
}
</style>