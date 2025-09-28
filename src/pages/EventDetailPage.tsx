import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from '../components/EventDetails';
const EventDetailPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  if (!id) {
    return <div className="text-center py-12">Event not found</div>;
  }
  return <EventDetails eventId={id} />;
};
export default EventDetailPage;