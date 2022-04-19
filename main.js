async function setup() {
    let httpResponse = await fetch("dunkinDonuts.json");
    httpResponse = await httpResponse.json();
    let dunkinData = httpResponse.data;

    console.log(dunkinData);

    let state = dunkinData.map((x) => x.state);
    //state becomes new data set of all the values for the key "state" in the data.
    console.log(state);

    let storeCount = state.reduce((obj, value) => {
        if (value in obj) {
            obj[value]++;
        } else {
            obj[value] = 1
        }
        
        return obj;
    }, {});
    
    //counting instances of values in an object.
    console.log(storeCount);


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    
    data: {
        labels: Object.keys(storeCount), //x-axis becomes all the state names (key in object storeCount)
        datasets: [{
            type: 'bar',
            label: '# of stores per state',
            data: Object.values(storeCount), //y-axis becomes the values for the number of stores in each state (value for key in object storeCount)
            responsive: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

setup();