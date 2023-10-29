"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

type Props = {}

const data = [
    {
        text: "Hey",
        value: 3,
    },
]

const CustomWordCloud = (props: Props) => {
    const theme = useTheme();
  return (
    <>
        <D3WordCloud
            height={550}
            font="Times"
            data={data}
            fontSize={9}
            rotate={0}
            padding={10}
            fill = {theme.theme == "dark" ? "white" : "black"}
        />
    </>
  )
}

export default CustomWordCloud