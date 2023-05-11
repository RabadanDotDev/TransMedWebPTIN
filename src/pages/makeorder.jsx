import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/TablaMakeorder"
import myordersStyles from "../styles/Makeorder.module.css"
import { useState, useEffect } from "react";
import FilterTable from "../component/FilterTable"
import { Row, Col } from 'react-bootstrap'

import '../utils/med_server.js'

export default function Home() {
    const [searchValue, setSearchValue] = useState({ value: "", isCompleted: false });

    let [meds, setMeds] = useState([])

    useEffect(() => {
        fetch("/api/meds")
            .then((res) => res.json())
            .then((json) => {
                setMeds(json.meds)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleClick = () => {
        const medicamentos = [
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido con receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            },
            {
                "medName": "Ibuprofeno",
                "act_exc": "Ibuprofeno/Sorbitol (E-420)",
                "pvp": "30 comprimidos 4,68$",
                "dosis": "1 comprimido (600 mg) cada 6 a 8 horas",
                "detalles": "Pedido sin receta"
            }
        ];

        fetch('/api/makeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ medicamentos })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };

    const fetchMedicamentos = () => {
        fetch('/api/medicamentos')
            .then((res) => res.json())
            .then((data) => console.log('Medicamentos:', data.medicamentos))
            .catch((err) => console.error(err));
    };

    const handleButtonClick = () => {
        fetchMedicamentos();
    };

    return (
        <>
            <Head>
                <title>TransMedWebPTIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
                <Layout navBarValue={setSearchValue}>

                    <div className={myordersStyles.mainContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ marginLeft: '0px' }}>
                            <FilterTable />
                        </div>
                        <div style={{ flex: 1, marginTop: '25px', marginLeft: '5px' }}>
                            {/**Tablamakeorder recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}                 
                            <Tabla data={meds} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>
                        </div>
                    </div>
                </Layout> 
            </main>
        </>
    );
}