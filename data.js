const populationUrl = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11ra.px"
const employmentUrl = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_115b.px"
let dataTable = document.getElementById("table-body")

const fetchData = async (URL,body) => {
    const response = await fetch(URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return await response.json();
};



const initializeCode = async () => {
    const populationBody = await ((await fetch("population.json"))).json();
    const employmentBody = await ((await fetch("employment.json"))).json();

    const [populationData, employmentData] = await Promise.all([
        fetchData(populationUrl,populationBody),
        fetchData(employmentUrl,employmentBody)

    ]);

    function setupTable(population,employment){
            const cityLabel = population.dimension.Alue.category.label;
            const populationValue = population.value;
            const employmentValue = employment.value;

            Object.entries(cityLabel).forEach((city, i) => {
                let tr = document.createElement("tr")
                let td1 = document.createElement("td")
                let td2 = document.createElement("td")
                let td3 = document.createElement("td")
                let td4 = document.createElement("td")

                td1.innerText = city[1]
                td2.innerText = populationValue[i]
                td3.innerText = employmentValue[i]

                const percentagedata = (employmentValue[i] / populationValue[i])*100

                td4.innerText = percentagedata.toFixed(2)+"%"

                if(percentagedata > 45){
                    tr.style.backgroundColor = "#abffbd";
                }

                else if (percentagedata < 25){
                    tr.style.backgroundColor = "#ff9e9e";
                }

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                dataTable.appendChild(tr)
            });
            

    }
    setupTable(populationData, employmentData);
        
};



initializeCode();
