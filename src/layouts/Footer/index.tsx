import    './index.scss';
export interface Props {
  title: string;
  enterprise:string
}

export default function Footer(props: Props) {
  const {title,enterprise} = props;
  return (
    <p className="footer" >
      <span className="  logo">{title}</span>
      <br />
      <span className=" copyright" >{enterprise}</span>
    </p>
  );
}
