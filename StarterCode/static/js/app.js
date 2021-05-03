function buildPlots(userInput) {
    d3.json('samples.json').then((d) => {
        var filter = d.samples.filter(i => i.id == userInput)
        var filtids = filter[0].otu_ids
        var sample = filter[0].sample_values
        var labels = filter[0].otu_labels
        var top_ids = filtids.slice(0, 10).reverse()
        var top_samples = sample.slice(0, 10).reverse()
        var top_labels = labels.slice(0, 10).reverse()
        var trace1 = {
            x: top_samples,
            y: top_ids.map(i => `OTU ${i}`),
            text: top_labels,
            type: "bar",
            orientation: "h",
        }
        Plotly.newPlot('bar', [trace1])
        var trace2 = {
            x: filtids,
            y: sample,
            text: labels,
            mode: 'markers',
            marker: {
                size: sample,
                color: filtids
            }
        }
        Plotly.newPlot('bubble', [trace2])
        var bubble_li = d3.select('#sample-metadata')
        var selected_data = d.metadata.filter(i => i.id == userInput)
        selected_data.forEach(i => {
            bubble_li.html('')
            bubble_li.append('li').html(`ID: ${i.id}<br>`)
            bubble_li.append('li').html(`WAFREQ: ${i.wfreq}<br>`)
            bubble_li.append('li').html(`Age: ${i.age}<br>`)
            bubble_li.append('li').html(`Ethnicity: ${i.ethnicity}<br>`)
            bubble_li.append('li').html(`Location: ${i.location}<br>`)
            bubble_li.append('li').html(`BBType: ${i.bbtype}<br>`)
            bubble_li.append('li').html(`Gender: ${i.gender}<br>`)
        })
    })
}

function optionChanged(option) {
    buildPlots(option)
}

d3.json('samples.json').then((d) => {
    console.log(d);
    var dropdown = d3.select('#selDataset')
    var otu_idArr = []
    d.metadata.forEach(i => {
        otu_idArr.push(i.id)
        dropdown.append('option').text(i.id)
    })
    console.log(otu_idArr)
});
  