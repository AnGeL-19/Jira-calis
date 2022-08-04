
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts/Layout'
import { EntryList, NewEntry } from '../components/ui/';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - operaJira'>
      
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pediente"/>

            <NewEntry />
            <EntryList status='pending'/>
            
            
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En progreso"/>

            
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completado"/>

            <EntryList status='finished'/>
          </Card>
        </Grid>

      </Grid>

    </Layout>
    
  )
}

export default HomePage
