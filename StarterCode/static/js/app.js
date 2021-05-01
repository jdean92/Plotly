var dropdownMenu = d3.select("#selDataset");
d3.json("samples.json").then(function(data) {
    console.log(data);
    Name_values=data.names
    Name_values.forEach(d => {
        var o = dropdownMenu.append("option");
        o.text(d);
})
Demo_values(Name_values[0])
    }
  );  
  function Demo_values (Filter_id) {
    d3.json("samples.json").then(function(data) {
        Demographic=data.metadata
        filter_meta=Demographic.filter(Demo=>Demo.id==Filter_id)
        first_metadata=filter_meta[0]
        Meta_sample=d3.select("#sample-metadata")
        Object.entries(first_metadata).forEach(([column,value])=>{
            var o = Meta_sample.append("option");
            o.text(`${column}:${value}`);
    })})
  }  
  //Make a value for optionChanged found in the index to fix error on page