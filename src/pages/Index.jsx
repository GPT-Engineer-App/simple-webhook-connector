import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Select from 'react-select';
import { toast } from "sonner"

const Index = () => {
  const [countryCode, setCountryCode] = useState({ value: '+49', label: '🇩🇪 +49' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${countryCode.value}${phoneNumber}`;
    try {
      const res = await fetch('https://24c6ae20-e6c8-4e33-a26d-8d3c96d82866-00-1175pigntlzx5.riker.replit.dev/first_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });
      const data = await res.json();
      setResponse(data);
      toast.success("Response received", {
        description: JSON.stringify(data, null, 2),
        duration: 5000,
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred' });
      toast.error("An error occurred", {
        description: "Failed to send the request or receive a response.",
        duration: 5000,
      });
    }
  };

  const countries = [
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+49', label: '🇩🇪 +49' },
    { value: '+33', label: '🇫🇷 +33' },
    { value: '+39', label: '🇮🇹 +39' },
    { value: '+34', label: '🇪🇸 +34' },
    { value: '+81', label: '🇯🇵 +81' },
    { value: '+86', label: '🇨🇳 +86' },
    { value: '+91', label: '🇮🇳 +91' },
    { value: '+7', label: '🇷🇺 +7' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '0.375rem',
      borderColor: 'hsl(var(--input))',
      '&:hover': {
        borderColor: 'hsl(var(--input))',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-2">WhatsApp Message Sender</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter a phone number to send a WhatsApp message to. We'll validate the number and provide details about it.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-1/3">
              <Select
                options={countries}
                value={countryCode}
                onChange={setCountryCode}
                styles={customStyles}
                isSearchable
                formatOptionLabel={({ label }) => (
                  <div className="flex items-center">
                    <span className="mr-2">{label.split(' ')[0]}</span>
                    <span>{label.split(' ')[1]}</span>
                  </div>
                )}
              />
            </div>
            <div className="w-2/3">
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
        {response && (
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Index;
