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
mutation KullaniciEkle($email: String!, $hesapTipi: String!, $isim: String!, $sifre: String!, $sifreDogrulama: String!, $soyisim: String!) {
  kullaniciEkle(email: $email, hesapTipi: $hesapTipi, isim: $isim, sifre: $sifre, sifreDogrulama: $sifreDogrulama, soyisim: $soyisim) {
    kullanici{
      isim:isim,
      soyisim:soyisim,
      email:email,
      hesapTipi:hesapTipi,
      sifre:sifre,
      sifreDogrulama:sifreDogrulama
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