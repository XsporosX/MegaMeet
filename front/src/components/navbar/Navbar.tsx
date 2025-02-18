import React from "react";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const svgGroup1 = [
    {
      src: "/comentario.svg",
      href: "/chats",
    },
    {
      src: "/libro-cubierta-abierta.svg",
      href: "/tasks",
    },
    {
      src: "/video-flecha-arriba-derecha.svg",
      href: "/meetings",
    },
    {
      src: "/visor-de-la-camara.svg",
      href: "/camera",
    },
  ];

  const svgGroup2 = [
    {
      src: "/brillo.svg",
      href: "/componente5",
    },
    {
      src: "/luna-estrellas.svg",
      href: "/componente6",
    },
    {
      src: "/personalizar.svg",
      href: "/settings",
    },
  ];

  const HTMLsvgGroup1 = svgGroup1.map((image, index) => (
    <Link key={index} href={image.href}>
      <Image
        src={image.src}
        alt={`Image ${index + 1}`}
        width={30}
        height={30}
        className="navbar-icon"
      />
    </Link>
  ));

  const HTMLsvgGroup2 = svgGroup2.map((image, index) => (
    <Link key={index} href={image.href}>
      <Image
        src={image.src}
        alt={`Image ${index + 1}`}
        width={30}
        height={30}
        className="navbar-icon"
      />
    </Link>
  ));

  return (
    <div className="navbar">
      <div className="navbar_group1">{HTMLsvgGroup1}</div>
      <div className="navbar_group2">{HTMLsvgGroup2}</div>
    </div>
  );
}

export default Navbar;
