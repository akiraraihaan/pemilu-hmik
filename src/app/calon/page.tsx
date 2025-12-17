'use client';

import React, { useContext, useState, useEffect, MouseEvent } from "react";


import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Router } from "next/router";

interface InputState {
  nim: string;
  choice_id: string;
}

const Form = () => {
  const APIEndpoint = "http://localhost:3000"
  const [input, setInput] = useState<InputState>({ nim: "", choice_id: "" });
  const router = useRouter();
  let nimParam = ""

  useEffect(() => {

    let params = new URLSearchParams(window.location.search);
    let nimParam = params.get('nim');
  }, [])


  const handleVote1 = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
      console.log(nimParam)
      console.log(`http://localhost:3000/api/vote?nim=${nimParam}&choice_id=1`)

      const response = await fetch(`api/vote?choice_id=1`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "choice_id": 2,
        }),
      });

      console.log(response)
      if (response.ok) {
        console.log("ping")

        router.push("/");
      } else {
        // Handle failed response condition as needed
      }

      if (!response.ok) {
        console.log("ping")
        throw new Error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch error as needed
    }
  }

  const handleVote2 = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
      console.log("ping")
      console.log(`http://localhost:3000/${APIEndpoint}api/vote?nim=${nimParam}&choice_id=2`)

      const response = await fetch(`api/vote?choice_id=2`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "choice_id": 1,
        }),
      });

      console.log(response)
      if (response.ok) {
        console.log("ping")

        router.push("/");
      } else {
        // Handle failed response condition as needed
      }

      if (!response.ok) {
        console.log("ping")
        throw new Error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch error as needed
    }
  }

  const handleVote3 = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
      console.log("ping")
      console.log(`http://localhost:3000/${APIEndpoint}api/vote?nim=${nimParam}&choice_id=3`)

      const response = await fetch(`api/vote?choice_id=3`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "choice_id": 3,
        }),
      });

      console.log(response)
      if (response.ok) {
        console.log("ping")

        router.push("/");
      } else {
        // Handle failed response condition as needed
      }

      if (!response.ok) {
        console.log("ping")
        throw new Error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch error as needed
    }
  }

  return (
    <div
      className="min-h-screen min-w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/assets/bg4.jpg')`, // Path gambar
        backgroundSize: 'cover', // Menyesuaikan ukuran gambar
        backgroundPosition: 'center', // Posisi gambar
        backgroundRepeat: 'no-repeat', // Tidak mengulang gambar
      }}
    >
      <form className="">

        <table className="w-full">
          <tbody className="flex p-8 gap-28 g-10 justify-center">
            <tr className="flex p-8 gap-28 g-10 justify-center">

              <td className="sm:w-full md:w-1/3 px-2">
                <div className="flex flex-col max-w-full h-full rounded overflow-hidden shadow-lg bg-white ">
                  <Image className="w-full h-auto" src="/assets/feedigpaslon1.png" width={1500} height={2500} alt="Foto kandidat 1" />

                  <div className="px-6 py-4">
                    <div className="text-black font-bold text-xl mb-2">Bambang Istijab - Raihan Akira Rahmaputra</div>
                    <div className="text-black font-bold text-l mb-2">Visi</div>
                    <p className="text-black text-base">
                      Menjadi himpunan mahasiswa yang menciptakan perubahan positif
                      dari inisiatif-inisiatif kecil yang berdampak besar dalam waktu singkat melalui program-program inovatif dan kolaboratif.
                    </p>
                    <div className="text-black font-bold text-l my-2">Misi</div>
                    <ul className="text-black">
                      <li className="mt-2">
                        Menciptakan suasana yang serius namun santai dalam setiap kegiatan, agar semua anggota dapat berkontribusi tanpa tekanan.
                      </li>
                      Meningkatkan komunikasi dan partisipasi aktif anggota.
                      <li className="mt-2">
                        Mengeksplorasi potensi tiap mahasiswa sesuai kompetensi baik dalam bidang akademik maupun nonakademik.
                      </li>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br><br></br>
                    <br></br>
                    <br></br>
                    </ul>
                  </div>
                  <div className="flex justify-center pt-4 pb-8 mt-4">
                    <button onClick={handleVote2} className="justify-center inline-block rounded bg-neutral-800 px-12 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                      VOTE PASLON 1
                    </button>
                  </div>
                  <div className="flex justify-center mt-8">
                  </div>
                </div>
              </td>

              <td className="sm:w-full md:w-1/3 px-2">
                <div className="flex flex-col max-w-full h-full rounded overflow-hidden shadow-lg bg-white">
                  <Image className="w-full" src="/assets/feedigpaslon2.png" width={1500} height={2500} alt="Foto kandidat 2" />
                  <div className="">
                    <div className="px-6 py-4">
                      <div className="text-black font-bold text-xl mb-2">Fauzan Azhima - Alghifari Rasyid Zola</div>
                      <div className="text-black font-bold text-l mb-2">Visi</div>
                      <p className="text-black text-base">
                        Menjadikan HMIK sebagai wadah
                        untuk mengembangan minat dan
                        bakat secara aktif, adaptif, dan
                        kolaboratif, dengan asas kekeluargaan.
                      </p>
                      <div className="text-black font-bold text-l my-2">Misi</div>
                      <ul className="text-black">
                        <li className="mt-2">
                          Membangun citra HMIK sebagai wadah utama pengembangan mahasiswa ilmu komputer.
                        </li>
                        <li className="mt-2">
                          Mendorong penguat minat dan potensi mahasiswa ilmu komputer di berbagai bidang.
                        </li>
                        <li className="mt-2">
                          Mewujudkan suasana kekeluargaan yang harmonis dalam setiap aktivitas HMIK untuk mendukung tercapainya tujuan bersama.
                        </li>
                        
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br />
                  
                    <br></br>
                    <br></br>
                      </ul>
                    </div>
                    <div className="flex justify-center mt-8">
                    </div>
                    <div className="flex justify-center pt-4 pb-8 mt-4">
                      <button onClick={handleVote1} className="justify-center inline-block rounded bg-neutral-800 px-12 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                        VOTE PASLON 2
                      </button>
                    </div>
                    <div className="flex justify-center mt-8">
                    </div>
                  </div>
                </div>
              </td>

              <td className="sm:w-full md:w-1/3 px-2">
                <div className="flex flex-col max-w-full h-full rounded overflow-hidden shadow-lg bg-white">
                  <Image className="w-full" src="/assets/feedigpaslon3.png" width={1500} height={2500} alt="Foto kandidat 3" />
                  <div className="">
                    <div className="px-6 py-4">
                      <div className="text-black font-bold text-xl mb-2">Haekal Putra Alzharis - Nurul Humam Mutarobi</div>
                      <div className="text-black font-bold text-l mb-2">Visi</div>
                      <p className="text-black text-base">
                        Menjadikan HMIK sebagai wadah untuk membantu mahasiswa Ilmu Komputer mengembangkan kemampuan diri, baik di bidang akademik maupun non akademik. selain itu, menciptakan Himpunan yang dapat memperluas relasi mahasiswa Ilmu Komputer, baik dalam lingkup kampus dengan program studi lain.
                        maupun dari pihak luar, seperti Start-Up, Komunitas, dan intstitusi, sehingga mahasiswa Ilmu Komputer memiliki relasi yang luas.
                      </p>
                      <div className="text-black font-bold text-l my-2">Misi</div>
                      <ul className="text-black">
                        <li className="mt-2">
                          Membangun kerja sama dengan program studi lain di
                          Kampus untuk menciptakan kolaborasi yang
                          Nantinya dapat mempererat hubunoan antar
                          Himpunan, serta menguntungkan bagi kedua belah
                          Pihak.
                        </li>
                        <li className="mt-2">
                          Membuat peluang kemitraan dengan pihak luar,
                          Seperti perusahaan teknologi, komunitas, dan
                          Institusi untuk mendukung mahasiswa mengenal
                          Dunia kerja dan membangun jaringan.

                        </li>
                        <li className="mt-2">
                          Mendukung bagi mahasiswa ilmu komputer yang
                          Ingin berkompetisi dari segi akademik maupun non-
                          Akademik.
                        </li>
                        <li className="mt-2">
                          Membangun dan memperkuat rasa kekeluargaan
                          Antaranggota himpunan melalui kegiatan yano
                          Harmonis dan inklusif.

                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center mt-8">
                    </div>
                    <div className="flex justify-center pt-4 pb-8 mt-4">
                      <button onClick={handleVote3} className="justify-center inline-block rounded bg-neutral-800 px-12 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                        VOTE PASLON 3
                      </button>
                    </div>
                    <div className="flex justify-center mt-8">
                    </div>
                  </div>
                </div>
              </td>

            </tr>
          </tbody>
        </table>


        <div className="">

        </div>
      </form>
    </div>
  );
};

export default Form;
