import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import {initStore} from '../store'
import theme from '../static/theme'
import Calculations from '../components/Calculations'
import Form from '../components/Form'
import ImportantDates from '../components/ImportantDates'

const index = () => {
  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <link href='/static/theme.css' rel='stylesheet'/>
      </Head>
      <ThemeProvider theme={theme}>
        <div>
          <AppBar title='ISA Calculator'/>
          <Form/>
          <Calculations/>
          <ImportantDates/>
        </div>
      </ThemeProvider>
    </div>
  )

}

export default withRedux(initStore)(index)
