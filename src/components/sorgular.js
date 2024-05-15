import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
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
