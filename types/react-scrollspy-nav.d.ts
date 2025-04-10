declare module 'react-scrollspy-nav' {
  interface ScrollspyNavProps {
    scrollTargetIds: string[];
    activeNavClass: string;
    offset?: number;
    scrollDuration?: string;
    children: React.ReactNode;
  }

  export default function ScrollspyNav(props: ScrollspyNavProps): JSX.Element;
}
