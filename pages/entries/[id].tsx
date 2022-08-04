import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'

import { Layout } from '../../components/layouts/Layout';
import { Entry, EntryStatus } from '../../interfaces';
import { getEntryById } from '../../db';
import { EntriesContext } from '../../context/entries/';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending','in-progress','finished']

interface Props {
    entry: Entry
}


export const EntryPage: FC<Props>= ({entry}) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const router = useRouter()

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(()=> inputValue.length <= 0 && touched,[inputValue, touched])
    
        
    const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        
    }
    
    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
        
    }

    const onSave = () => {
        if( inputValue.trim().length === 0)return;
        

        const update: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        
        updateEntry(update, true)
        router.push('/')
    }

    const onDelete = () => {
        deleteEntry(entry._id, true)
        router.push('/')
    }

  return (
    <Layout title={capitalize(inputValue.substring(0,15)+'...')}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={`Entrada`}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createAt)}`}
                    />
                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={onInputChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={ () => setTouched(true)}
                                error={ isNotValid }
                            />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup 
                                row
                                onChange={onStatusChanged}
                                value={status}
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel 
                                            key={option} 
                                            value={option}
                                            control={ <Radio />}
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon/>}
                                variant="contained"
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                   
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
        }}
        onClick={ onDelete }
        >
            <DeleteOutlineOutlined />
        </IconButton>

    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
   
    const { id } = ctx.params as { id: string}

    const entry = await getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;