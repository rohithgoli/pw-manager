import './index.css'

const iconColorsList = [
  {
    id: 0,
    color: '#0b69ff',
  },
  {
    id: 1,
    color: '#7683cb',
  },
  {
    id: 2,
    color: '#f59e0b',
  },
  {
    id: 3,
    color: '#10b981',
  },
  {
    id: 4,
    color: '#f97316',
  },
  {
    id: 5,
    color: '#14b8a6',
  },
  {
    id: 6,
    color: '#b91c1c',
  },
  {
    id: 7,
    color: '#0ea5e9',
  },
]

const PasswordItem = props => {
  const {itemDetails, passwordDisplay, onDeletePwItem} = props
  const {id, website, username, password} = itemDetails

  const getIconName = websiteName => {
    const iconName = websiteName.slice(0, 1)
    return iconName.toUpperCase()
  }
  const getBgColor = () => {
    const numGenerated = Math.floor(Math.random() * 7)
    return iconColorsList[numGenerated]
  }

  const onDeleteItem = () => {
    onDeletePwItem(id)
  }

  return (
    <li className="pw-item-container">
      <div className="pw-item-info-container">
        <div className={`icon-container bg-color-${getBgColor().id}`}>
          <p className="website-icon">{getIconName(website)}</p>
        </div>
        <div className="pw-details-container">
          <p className="login-website">{website}</p>
          <p className="login-details">{username}</p>
          {passwordDisplay ? (
            <p className="login-details">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-img"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        testid="delete"
        onClick={onDeleteItem}
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
