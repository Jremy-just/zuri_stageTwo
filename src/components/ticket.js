import { useLocation, useNavigate } from "react-router-dom";

const TicketPage = () => {
const location = useLocation();
const navigate = useNavigate();
const { fullName, email, avatarUrl } = location.state || {};

if (!fullName || !email || !avatarUrl) {
    return <p>No ticket data found. Please go back and generate a ticket.</p>;
}

return (
    <div className="ticket">
    <h2>🎉 Congratulations! 🎉</h2>
    <div className="ticket">
        <img src={avatarUrl} alt="Avatar" className="avatar" />
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        <button onClick={() => navigate("/")}>Go Back</button>
    </div>
    </div>
);
};

export default TicketPage;