import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import store from '../store'
import theme from '../static/theme'
import Calculations from '../components/Calculations'
import Form from '../components/Form'
import ImportantDates from '../components/ImportantDates'

const index = () => {
  const leftIconSrc = 'https://brand.learnersguild.org/assets/learners-guild-icon.svg'
  const leftIcon = (
    <Link href="/">
      <span>
        <img id="logo" src={leftIconSrc} alt="logo" title="Learners Guild"/>
        <style jsx>{`
          img#logo {
            width: 40px;
            height: 40px;
          }
        `}</style>
      </span>
    </Link>
  )
  const title = (
    <span>
      <h1 className="title">ISA Calculator</h1>
      <style jsx>{`
        h1.title {
          display: inline-block;
          margin-left: 10px;
          font-family: Roboto;
          font-size: 1.3em;
        }
      `}</style>
    </span>
  )

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href="https://brand.learnersguild.org/coast-228x228.png"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <link href="/static/theme.css" rel="stylesheet"/>
      </Head>
      <ThemeProvider theme={theme}>
        <div>
          <AppBar
            leftIcon={leftIcon}
            title={title}
          />
          <Form/>
          <Calculations/>
          <ImportantDates/>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default withRedux(store)(index)
