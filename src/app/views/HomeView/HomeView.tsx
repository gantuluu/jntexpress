import React from 'react';
import { AutoSliderBanner } from './AutoSliderBanner';
import { TrackingInput } from './TrackingInput';
import { QuickAction } from './QuickAction';
import { EventList, NewsList } from './EventList';

export const HomeView = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative">
        <AutoSliderBanner />
        <div className="relative -mt-10 z-10">
          <TrackingInput />
        </div>
      </div>
      <QuickAction />
      <div className="h-3 bg-gray-50" />
      <EventList />
      <div className="h-3 bg-gray-50" />
      <NewsList />
    </div>
  );
};
