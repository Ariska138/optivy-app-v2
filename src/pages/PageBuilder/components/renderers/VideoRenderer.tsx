import React from 'react';
import { Youtube } from 'lucide-react';
import { ComponentPropsMap } from '../../types.ts';

const getYoutubeId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
    if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
  } catch (e) { /* Invalid URL */ }
  return null;
}

export const VideoRenderer: React.FC<{ component: { props: ComponentPropsMap['Video']} }> = ({ component }) => {
  const videoId = getYoutubeId(component.props.url);
  return (
    <div className="relative w-full" style={component.props.style}>
      {videoId ? (
        <iframe className="w-full h-full aspect-video" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      ) : (
        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500 min-h-[200px]"><Youtube size={48} /><span className="text-sm mt-2">Invalid YouTube URL</span></div>
      )}
      {/* This transparent overlay captures clicks, making the entire component easy to select in the editor. */}
      <div className="absolute inset-0 z-10"></div>
    </div>
  );
};