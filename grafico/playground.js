function loadStuff ()
{
    let dataset = [];
    let data = [0, 1, 2, 3, 10, 5, 7, 3, 11];
    let colorSet = ['3399ff', 'ff3333'];
        
    for (let i = 0; i < data.length; i++) {

        let condition = (Math.floor(Math.random() * 100000) % 2 == 0) ? true : false;
  
        if(i == 0){
            dataset.push({
                label: "frequencia",
                data: [(condition) ? data[i] : 0],
                borderColor: '#' + colorSet[0] + 'ff',
                backgroundColor: '#' + colorSet[0] + '99',
                fill: true,
                borderWidth: 1
            });  
            dataset.push({
                label: "frequencia",
                data: [(!condition) ? data[i] : 0],
                borderColor: '#' + colorSet[1] + 'ff',
                backgroundColor: '#' + colorSet[1] + '99',
                fill: true,
                borderWidth: 1
            });        
        }
        else{
            dataset[0].data.push((condition) ? data[i] : 0);
            dataset[1].data.push((!condition) ? data[i] : 0);
        }        
    }

    let grafStuff = {
		type: 'bar',
		data: {
			labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9'],
			datasets: dataset
		},
		options: {
			scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
		}
    }
    
    grafObj = new Chart($("#graf")[0], grafStuff);
    
}

window.onload = () =>
{
    loadStuff();
}