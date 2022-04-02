import { NextResponse } from 'next/server';

export default function middleware(req) {
  const { Bearer } = req.cookies;
  const url = req.url;
  if (Bearer !== undefined && url == `${process.env.BASE_URL}login`) {
    return NextResponse.redirect(`${process.env.BASE_URL}dashboard`);
  }

  if (Bearer == undefined && url == `${process.env.BASE_URL}dashboard`) {
    return NextResponse.redirect(`${process.env.BASE_URL}login`);
  }

}