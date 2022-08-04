import { Card, CardActionArea, CardActions, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props{
    entry: Entry;
}

export const EntryCard: FC<Props>= ({entry}) => {

  const { startDrawing, endDrawing } = useContext(UIContext)
  const router = useRouter()
  
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer?.setData('text', entry._id)
    startDrawing()
  }
  
  const onDragEnd = () => {
    endDrawing()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }
  
  return (
    <Card 
      sx={{ marginBottom: 1, padding: 1 }} 
      draggable 
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
        <CardActionArea>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', padding: 1}}>
            <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createAt)}</Typography>
        </CardActions>
    </Card>
  )
}
