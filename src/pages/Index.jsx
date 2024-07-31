import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Select from 'react-select';
import { countries } from '@/lib/countryData';

const Index = () => {
  const [countryCode, setCountryCode] = useState(countries[0]);
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
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred' });
    }
  };

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
