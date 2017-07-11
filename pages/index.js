import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import {initStore} from '../store'
import theme from '../static/theme'
import ISAVariables from '../components/ISAVariables'

const index = () => {
  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <link href='/static/theme.css' rel='stylesheet'/>
      </Head>
      <ThemeProvider theme={theme}>
        <Card style={{maxWidth: '350px'}}>
          <CardTitle title="ISA Calculator"/>
          <CardText>
            <ISAVariables/>
          </CardText>
        </Card>
      </ThemeProvider>
    </div>
  )

}

export default withRedux(initStore)(index)
