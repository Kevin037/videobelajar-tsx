import Link from "next/link";

type ButtonType = 'button' | 'submit' | 'reset';

type BaseButtonProps = {
  children: React.ReactNode;
  varian?: string;
};

type ButtonProps = BaseButtonProps & {
  type?: ButtonType;
  onClick?: () => void;
};

type LinkButtonProps = BaseButtonProps & {
  url?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = (props) => {
    const {varian, children,type, onClick = () => {}} = props
    return (
      <button 
        className={`h-10 px-6 font-semibold rounded-md ${varian} text-white`} 
        type={type}
        onClick={onClick}
        >
      {children}
    </button>
  );
}

export const ButtonTheme: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  if (url) {
     return (
      <Link 
        onClick={onClick}
        className={`block text-center w-full py-2 rounded-theme transition ${varian}`} 
        href={url}
        >
      {children}
      </Link>
    ); 
  }
    return (
      <button 
        onClick={onClick}
        className={`block text-center w-full py-2 rounded-theme transition ${varian}`} 
        >
      {children}
      </button>
    ); 
}

export const ButtonMd: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian} = props
  if (url) {
    return (
      <Link 
        className={`bg-green-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer ${varian}`} 
        href={url}
        >
      {children}
      </Link>
    );
  }
    return (
      <button 
        className={`bg-green-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer ${varian}`} 
        >
      {children}
      </button>
    );
}

export const ButtonSubmitTheme: React.FC<ButtonProps> = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <button 
      className={`block text-center w-full py-2 rounded-theme transition ${varian} cursor-pointer`} 
      type={type}
      onClick={onClick}
      >
    {children}
    </button>
  );
}

export const ButtonSubmitMDTheme: React.FC<ButtonProps> = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <button 
      className={`block md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer ${varian}`} 
      type={type}
      onClick={onClick}
      >
    {children}
    </button>
  );
}

export const ButtonPrimarySubmit: React.FC<ButtonProps> = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <ButtonSubmitTheme 
      type={type}
      onClick={onClick}
      varian={`bg-green-500 hover:bg-green-600 text-white ${varian}`}>
    {children}
    </ButtonSubmitTheme>
  );
}

export const ButtonPrimary: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`bg-green-500 hover:bg-green-600 text-white ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonDisabled: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`text-white ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonPrimaryMD: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian, onClick} = props
  if (url) {
    return (
      <Link 
        href={url}
        onClick={onClick}
        className={`${varian} block md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer`}>
      {children}
      </Link>
    );
  }
    return (
    <button 
      onClick={onClick}
      className={`${varian} block md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer`}>
    {children}
    </button>
  );
}

export const ButtonPrimaryMDSubmit: React.FC<ButtonProps> = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <ButtonSubmitMDTheme 
      type={type}
      onClick={onClick}
      varian={`${varian}`}>
    {children}
    </ButtonSubmitMDTheme>
  );
}

export const ButtonWhiteMD: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  if (url) {
    return (
      <Link 
        href={url}
        onClick={onClick}
        className={`${varian} block md:inline-block bg-white-500 text-green-500 border px-4 py-2 rounded-lg hover:bg-white-600 transition cursor-pointer`}>
      {children}
      </Link>
    );
  }
    return (
      <button
        onClick={onClick}
        className={`${varian} block md:inline-block bg-white-500 text-green-500 border px-4 py-2 rounded-lg hover:bg-white-600 transition cursor-pointer`}>
      {children}
      </button>
    );
}

export const ButtonWhite: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`bg-white-500 border hover:bg-white-600 text-green-500 ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonYellow: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian} = props
  return (
    <ButtonTheme 
      url={url}
      varian={`bg-yellow-400 text-white cursor-pointer ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonSecondary: React.FC<LinkButtonProps> = (props) => {
  const {url, children, varian,onClick} = props
  return (
      <ButtonTheme 
        url={url}
        onClick={onClick}
        varian={`bg-green-100 text-green-600 hover:bg-green-200 ${varian}`}>
      {children}
      </ButtonTheme>
  );
}

export const ButtonSpan: React.FC<ButtonProps> = (props) => {
  const {type, children, varian, onClick} = props
  return (
      <ButtonSubmitTheme 
        type={type}
        onClick={onClick}
        varian={`border flex items-center justify-center gap-2 ${varian}`}>
      {children}
       </ButtonSubmitTheme>
  );
}