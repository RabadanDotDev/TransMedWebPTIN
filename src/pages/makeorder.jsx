import Head from 'next/head'
import Layout from "../component/Layout"
import fsPromises from 'fs/promises';
import path from 'path';
import Tabla from "../component/TablaMakeorder"
import myordersStyles from "../styles/Makeorder.module.css"
import {useState} from "react";

export async function getStaticProps() {
    //función de nextjs que se encarga de cargar los datos medicamentos.json (placeholder que después se cambiará por la API)
    const filePath = path.join('public/', 'medicamentos.json');
    const jsonData = await fsPromises.readFile(filePath);
    const data = JSON.parse(jsonData);
  
    return {
      props: data
    }
}

export default function Home(props) {
    const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});
    const med = props.medicamentos;

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
            <div className={myordersStyles.mainContainer}>
            {/**Tablamakeorder recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}
            <Tabla data={med} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            </Layout> 
        </main>
        </>
    );
}