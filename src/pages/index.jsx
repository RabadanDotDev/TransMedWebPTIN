import Head from 'next/head'
import * as env_config from '../utils/env_config'
import AuthWebInfoCard from '../component/auth/AuthWebInfoCard';
import AuthSignCard from '../component/auth/AuthSignCard';
import commonGetServerSideProps from '../utils/gen_common_props';
import useCookie from '../hooks/useCookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}


export default function Home(props) {
  const router = useRouter()
  const onClickHandler = (e) => {
    e.preventDefault()
    router.push("/login")
  }

  return (
    <>
      <Head>
        <title>TransMed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main className='flex justify-center items-center h-screen'>  
    

      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div class="flex flex-col justify-center">
                <img className="-ml-20 m-5" src="/media/logo/Blanco-layout.png" alt="" />
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">La teva salut, en moviment.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <a onClick={(e) => onClickHandler(e)} class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Iniciar sesión
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>

                </div>
            </div>
            <div>
                <iframe class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" width="560" height="315" src="https://www.youtube.com/embed/yeEzHcYu7DE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </section>


      </main>
    </>
  )
}

