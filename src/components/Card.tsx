import React, { PropsWithChildren } from 'react';
import { ChatMessage } from '../model/ChatMessage';

const Avtar:React.FC<{avatarUrl?:string}> = (props) => {
  const { avatarUrl } = props;
  if (avatarUrl === undefined) return null;

  return (
    <div className="">
      <img
        className="rounded-full"
        alt="avatar"
        src={avatarUrl}
        width="75px"
        height="75px"
      />
    </div>
  );
};

const Badge:React.FC<{badgeUrl:string, alt:string}> = ({ badgeUrl, alt }) => (
  <img
    className="rounded-full"
    alt={alt}
    src={badgeUrl}
    width="30px"
    height="30px"
  />
);

type BadgeType = {
  alt:string ;
  badgeUrl:string ;
  isActive:boolean;
}

const Header :React.FC<{userName:string, badges: BadgeType[] }> = ({ userName, badges }) => (

  <div className="flex flex-row-reverse">
    <h1 className="m-1 text-right">{userName}</h1>
    {badges.filter((b) => b.isActive)
      .map((b) => <Badge alt={b.alt} badgeUrl={b.badgeUrl} />)}
  </div>
);

const Body :React.FC<{message:string}> = ({ message }) => <div className="break-all p-2 max-w-3/4 text-left">{message}</div>;

const Footer :React.FC<{timestamp:string}> = ({ timestamp }) => <div>{timestamp}</div>;

export const Card = (props: { elem: ChatMessage; }) => {
  const { elem } = props;

  const badges :BadgeType[] = [
    {
      isActive: elem.user.isLurking,
      alt: 'lurker',
      badgeUrl: 'https://tl.net/staff/monk/Kerrigancoop/TransparentSized/Lurker.png',
    },
    {
      isActive: elem.user.brodcaster,
      alt: 'brodcaster',
      badgeUrl: ' https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1',
    }];

  return (
    <Container>
      <Avtar avatarUrl={elem.user.avatar} />
      <div className="flex m-1 flex-col flex-none">
        <Header userName={elem.user.displayName} badges={badges} />
        <Body message={elem.message} />
        <Footer timestamp={elem.timestamp} />
      </div>
    </Container>
  );
};

const Container:React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="
  w-8/12
  p-1
  m-1
  bg-gradient-to-r
  from-yellow-400
  via-red-500 to-pink-500
  flex
  flex-row
  justify-between
  "
  >
    {children}
  </div>
);
