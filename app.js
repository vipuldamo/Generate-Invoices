var s,script = {
	settings:{
		addButton	: $('#addMore'),
		ok: $('.ok'),
		formCount:1,
		changeField:$('.change-field'),
		print:$('#print'),
		taxTotal:0,
		total:0,
		grandTotal:0,
		addDisc:$('#addDisc'),
		dicVal:$('#dicVal'),
		discTerm:$('#discTerm')
	},
	init:function(){
		s = this.settings;
		this.bindUiAction();
		$('#showTable').hide();
	},

	bindUiAction:function(){
		var self = this;
		s.addButton.on('click', function(){
			self.addForm();
		});

		s.changeField.on('change', function(e){
			self.calculateLine(e);
		});

		s.print.on('click', function(){
			self.printTable();
		})

		s.addDisc.on('click', function(){
			self.calculateDiscount();
		})
	},

	calculateDiscount:function(){
		var discVal = parseInt(s.dicVal.val());
		if(discVal < 0){
			alert('Disscount value must be a positive value');
					return false;
		}
		if(s.taxTotal > 0 && s.total > 0){
			if(s.discTerm.val() == "1"){
				if(discVal > s.taxTotal || discVal > s.total){
					alert('Disscount amount should be less than total amount');
					return false;
				}
				s.grandTotal -= discVal;
				//s.total -= discVal;
			}else{
				var reduceValue = (discVal/100 * s.taxTotal)
				if(reduceValue > s.taxTotal || reduceValue > s.total){
					alert('Disscount amount should be less than total amount');
					return false;
				}
				s.grandTotal = s.taxTotal - reduceValue;
			}
		}else{
			alert('Total Not Found');
			return false;
		}

		//$('#total-without-tax').html(s.total);
		$('#grand-total').html(s.grandTotal);
	},
	addForm:function(){
		var self = this;
		s.formCount++;

		var html = '';
		html = '<br><label>Product:</label><input type="text" name="product" id="prod'+s.formCount+'" class="change-field" data-did="'+s.formCount+'">';
		html += '<label>Quantity:</label><input type="number" name="quantity" id="qty'+s.formCount+'" class="change-field" data-did="'+s.formCount+'">';
		html += '<label>Unit price:</label><input type="number" name="price" id="prz'+s.formCount+'" class="change-field" data-did="'+s.formCount+'">';
		html += '<label>Tax:</label>';
		html += '<select name="tax" id="tax'+s.formCount+'" class="change-field" data-did="'+s.formCount+'">'
		html +=	'	  <option value="0">0%</option>'
		html +=	'		  <option value="1">1%</option>'
		html +=	'		  <option value="5">5%</option>'
		html +=	'		  <option value="10">10%</option>'
		html +=	'		</select>'
		html += '<label>Total:</label><input type="text" name="total" id="ttl'+s.formCount+'" disabled>';
		html += '<input type="hidden" name="total" id="wtax'+s.formCount+'">';

		$('.inputForm').append(html);

		$('.change-field').on('change', function(e){
			self.calculateLine(e);
		});
	},
	calculateLine:function(e){
		var id = e.target.getAttribute("data-did");
		
		var prod = $('#prod'+id).val();
		var qty  = $('#qty'+id).val();
		var prz  = $('#prz'+id).val();
		var tax  = $('#tax'+id).val();
		if(typeof prod !=' undefined' && typeof qty !=' undefined' && typeof prz !=' undefined' && typeof tax !=' undefined'){
			if(prod != '' && qty != '' && prz != '' && tax != ''){
				var totalWithoutTax = qty*prz;
				totalAmount = totalWithoutTax;
				if(tax > 0){
					totalAmount = (tax/100 * totalWithoutTax) + totalWithoutTax;
				}
				$('#ttl'+id).val(totalAmount);
				$('#wtax'+id).val(totalWithoutTax);

				this.calculateAll();
			}
		}

	},

	calculateAll:function(){
		var taxTotl = 0;
		var total = 0;
		for(var i= 1; i<= s.formCount; i++ ){
			taxTotl += parseInt($('#ttl'+i).val());
			total += parseInt($('#wtax'+i).val());
		}
		$('#total-without-tax').html(total);
		$('#total-with-tax').html(taxTotl);
		$('#grand-total').html(taxTotl);
		s.taxTotal = taxTotl;
		s.total = total;
		s.grandTotal = taxTotl;
	},

	printTable:function(){
		if(s.taxTotal == 0 || s.total == 0){
			alert('Unable to generate the invoice, please check all fields have values');
			return false;
		}
		var taxTotl = 0;
		var total = 0;
		var html = '';
		for(var i= 1; i<= s.formCount; i++ ){
			taxTotl += parseInt($('#ttl'+i).val());
			total += parseInt($('#wtax'+i).val());

			html += '<tr>';
			html += '<td>'+$('#prod'+i).val()+'</td>';
			html += '<td>'+$('#qty'+i).val()+'</td>';
			html += '<td>'+$('#prz'+i).val()+'</td>';
			html +=	'<td>'+$('#tax'+i).val()+'</td>';
			html +=	'<td>'+$('#ttl'+i).val()+'</td>';
			html +=	'</tr>';
		}

		$('#table-content').html(html);
		$('#disp-ttotal').html(s.taxTotal);
		$('#disp-total').html(s.total);
		$('#disp-grand-total').html(s.grandTotal);
		$('#form-container').hide();
		$('#showTable').show();
		window.print();
	}
	
}

$( document ).ready(function() {
   script.init();
});