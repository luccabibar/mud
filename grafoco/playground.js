window.onload = () =>
{
    let dataset = [];
    let data = [0, 1, 2, 3, 10, 5, 7, 3, 10];
    let colors = [true, false, true, false, true, false, false, false, true];
    let customColors = ['3399ff', 'ff3333'];
        
    for (let i = 0; i < data.length; i++) {
        let color = cutsomColors[(colors[i]) ? 0 : 1];
        if(i == 0){
            dataset = {
                label: "frequencia",
                data: data[i],
                borderColor: '#' + color + 'ff',
                backgroundColor: '#' + color + '99',
                fill: false,
                borderWidth: 1
            }       
        }
        else{
            dataset.data.push(data[i]);
            dataset.data.push(color);
            dataset.data.push(color);
        }        
    }

    let grafStuff = {
		type: 'bar',
		data: {
			//labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
			datasets: dataset.data
		},
		options: {
			scales: {
			yAxes: [{
				ticks: {
				beginAtZero: true
				}
			}]
			}
		}
    }
    
    grafObj = new Chart($("#graf")[0], grafStuff);
}