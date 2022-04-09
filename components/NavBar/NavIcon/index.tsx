const NavIcon = ({
  link,
  imgPath
}: {
  link: string;
  imgPath: string;
}) => {

  return (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      <div className='md:w-7 w-5'>
        <img src={imgPath} />
      </div>
    </a>
  )
}

export default NavIcon
