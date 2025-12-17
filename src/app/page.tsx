'use client';

import React, { ChangeEvent, useState, useContext, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface InputState {
  nim: string;
  email:string;
}

const Home = () => {
  const APIEndpoint = "http://localhost:3000/"
  const [input, setInput] = useState<InputState>({ nim: "", email:"" });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted nim:", input.nim);
    console.log("Submitted EMAIL:", input.email);
    console.log(APIEndpoint)

    try {
      console.log("Mengirim request ke API...");
      const url = `${APIEndpoint}api/getToken?NIM=${input.nim}&EMAIL=${input.email}`;
      console.log("URL:", url);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response OK:", response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        router.push("/token");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || 'Terjadi kesalahan'}`);
      }
      
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Gagal terhubung ke server. Pastikan server berjalan.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }

  return (
    <>
      <div 
        className="min-h-screen pb-32 min-w-full flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg2.jpg')`, // Path gambar
          backgroundSize: '100% 100%',  // Lebar dan tinggi gambar disesuaikan dengan lebar dan tinggi elemen pembungkus
          backgroundPosition: 'center', // Posisi gambar
          backgroundRepeat: 'no-repeat', // Tidak mengulang gambar
          width: '100%',  // Lebar elemen pembungkus
          height: '100%', // Menetapkan tinggi sesuai dengan viewport
        }}
      >
        <div className="flex justify-center items-center p-10">
          <Image src="/assets/hima.png" width={300} height={300} alt="Logo HMIK" />
        </div>

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="content-card-container"
        >
          <div className="flex align-center justify-center items-center text-center">

          <div className="align-center justify-center items-center text-center relative w-72 min-w-[200px] h-10">
            <input
              onChange={handleChange}
              value={input.nim}
              type="text"
              name="nim"
              required
              className="peer w-full h-12 bg-transparent text-black font-sans font-normal outline outline-0 mt-4 
              focus:outline-0 disabled:bg-black transition-all placeholder-shown:border 
              placeholder-shown:border-black placeholder-shown:border-t-black border text-sm px-3 py-4 rounded-[7px] border-black focus:border-black"
     
              placeholder="Masukkan NIM"
            />
            <input
              onChange={handleChange}
              value={input.email}
              type="text"
              name="email"
              required
              className="peer w-full h-12 bg-transparent text-black font-sans font-normal outline outline-0 mt-4 
              focus:outline-0 disabled:bg-black transition-all placeholder-shown:border 
              placeholder-shown:border-black placeholder-shown:border-t-black border text-sm px-3 py-4 rounded-[7px] border-black focus:border-black"
     
              placeholder=" Masukkan email"
            />

            <button className="bg-black mt-5 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" type="submit">
              SUBMIT
            </button>
            </div>
          </div>
        </form>
      </div>

      {/* <button><a href='/result'>LIHAT HASIL VOTING</a></button> */}
    </>
  );
};

export default Home;
