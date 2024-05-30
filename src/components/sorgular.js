import { gql } from "@apollo/client";

export const GET_USERS = gql`
query MyQuery {
  kullanicilar {
    email
    hesapTipi
    id
    isim
    sifre
    sifreDogrulama
    soyisim
  }
}
`;

export const GET_CATEGORIES = gql`
query MyQuery {
    kategoriler {
      name
      id
    }
  }
`
export const GET_NAME = gql`
query GetUserByEmail($email: String!) {
  kullanicilar(email: $email) {
    isim
    soyisim
  }
}
`

export const KAYDOL = gql`
mutation KullaniciEkle($email: String!, $hesapTipi: String!, $isim: String!, $sifre: String!, $soyisim: String!,$telefon_no:String!) {
  kullaniciEkle(email: $email, hesapTipi: $hesapTipi, isim: $isim, sifre: $sifre, soyisim: $soyisim,telefonNo:$telefon_no) {
    kullanici{
      isim:isim,
      soyisim:soyisim,
      email:email,
      hesapTipi:hesapTipi,
      sifre:sifre,
      telefonNo:telefonNo
    }
  }
}
`
export const RESTAURANT_REGISTER = gql`
mutation RestoranEkle($name: String!,$sifre:String!,$hesapTipi:String!, $email: String!, $acilisSaati: Time!, $adres: String!, $category: String!, $kapanisSaati: Time!, $minTutar: Float!, $puan: Float!, $resim: String!, $telefon: String!) {
  restoranEkle(
    acilisSaati: $acilisSaati
    adres: $adres
    category: $category
    kapanisSaati: $kapanisSaati
    minTutar: $minTutar
    name: $name
    puan: $puan
    resim: $resim
    telefon: $telefon
    email: $email
    hesapTipi: $hesapTipi
    sifre:$sifre
  ) {
    restoran {
      acilisSaati: acilisSaati
      adres: adres
      category: category
      kapanisSaati: kapanisSaati
      minTutar: minTutar
      name: name
      puan: puan
      resim: resim
      telefon: telefon
      email: email
      hesapTipi:hesapTipi
      sifre:sifre
    }
  }
}
`


export const GET_RESTAURANT = gql`
query MyQuery {
  restoranlar {
    id
    acilisSaati
    category
    adres
    email
    id
    kapanisSaati
    minTutar
    name
    puan
    resim
    telefon
  }
}
`


export const GET_RESTAURANT_BY_EMAIL = gql`
mutation MyMutation($email: String!) {
  getRestoran(email: $email) {
    restoran {
      id
      name
      email
      minTutar
      id
      puan
      resim
      telefon
      kapanisSaati
      category
      adres
      acilisSaati
    }
  }
}
`

export const GET_URUNLER = gql`
query MyQuery {
  urunler {
    detay
    id
    fiyat
    image
    name
    restoran {
      id
    }
    category {
      id
      name
    }
  }
}
`;


export const URUN_EKLE = gql`
mutation urunekle(
  $name:String!,
  $image:String!,
  $fiyat:Float!,
  $detay:String!,
  $category:Int!,
  $restoran:Int!
) {
  urunEkle(
    name: $name
    image: $image
    fiyat: $fiyat
    detay: $detay
    category: $category
    restoran: $restoran
  ) {
    urun {
      name
      image
      fiyat
      detay
      category{
        id
      }
      restoran {
        id
        name
        puan
      }
    }
  }
}
`


export const CHECK_USER = gql`
mutation Getkullanicibyemail($email: String!) {
  getKullanici(email: $email) {
    kullanici {
      isim
      email
      hesapTipi
      id
      sifre
      soyisim
    }
  }
}
`


export const GET_USER_BY_EMAIL = gql`
mutation Getkullanicibyemail($email: String!) {
  getKullanici(email: $email) {
    kullanici {
      isim
      email
      hesapTipi
      id
      sifre
      soyisim
    }
  }

  }
`


export const LOGIN = gql`
mutation LoginMutation($email: String!, $sifre: String!) {
  login(email: $email, sifre: $sifre) {
		kullanici{
      id
      isim
      soyisim
      sifre
      hesapTipi
      email
      telefonNo
    }
  }
}
`


export const USER_UPDATE = gql`
mutation UpdateUserName($id: ID, $telefon_no: String, $isim: String, $soyisim: String, $sifre: String, $email: String, $hesapTipi: String) {
  kullaniciGuncelle(
    id: $id
    email: $email
    hesapTipi: $hesapTipi
    isim: $isim
    soyisim: $soyisim
    sifre: $sifre
    telefonNo: $telefon_no
  ) {
    kullanici {
      id
      isim
      soyisim
      email
      sifre
      hesapTipi
      telefonNo
    }
  }
}
`
export const SIPARIS_EKLE = gql`
mutation siparisEkle($siparisItems: [SiparisItemInput!]!) {
  siparisEkle(siparisItems: $siparisItems) {
    siparis {
      id
      toplamTutar
    }
  }
}
`;


export const DELETE_RESTAURANT = gql`
mutation MyMutation ($id:ID!){
  restoranSil(id:$id){restoran{name}}
}
`

export const DELETE_USER = gql `
mutation MyMutation ($id:ID!){
  kullaniciSil(id:$id){kullanici{isim}}
}
`