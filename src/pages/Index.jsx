import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Select from 'react-select';
import { cn } from "@/lib/utils"

const Index = () => {
  const [countryCode, setCountryCode] = useState({ value: '+49', label: '🇩🇪 +49' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState(null);
  const [messageType, setMessageType] = useState({ value: 'template', label: 'Template' });
  const [messageStyle, setMessageStyle] = useState({ value: 'professional', label: 'Professional' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fullPhoneNumber = `${countryCode.value}${phoneNumber}`;
    try {
      const res = await fetch('https://24c6ae20-e6c8-4e33-a26d-8d3c96d82866-00-1175pigntlzx5.riker.replit.dev/first_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone_number: fullPhoneNumber,
          message_type: messageType.value,
          ...(messageType.value === "assistant" && {
            message_style: messageStyle.value === "professional" ? "Professional & Formal" : "Friendly & Casual"
          })
        }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An error occurred';
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Network error: Unable to reach the server. Please check your internet connection or try again later.';
      } else {
        errorMessage = error.message || 'Failed to send the request or receive a response.';
      }
      setResponse({ error: errorMessage });
    } finally {
      setIsLoading(false);
    }
    // Keep the phone number in the input field after submission
    setPhoneNumber(phoneNumber);
  };

  const countries = [
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+49', label: '🇩🇪 +49' },
    { value: '+33', label: '🇫🇷 +33' },
    { value: '+39', label: '🇮🇹 +39' },
    { value: '+34', label: '🇪🇸 +34' },
    { value: '+31', label: '🇳🇱 +31' },
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

  const messageTypeOptions = [
    { value: 'template', label: 'Template' },
    { value: 'assistant', label: 'Assistant' },
    { value: 'video', label: 'Video' },
  ];

  const messageStyleOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
  ];

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-2">WhatsApp Message Sender</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter a phone number to send a WhatsApp message to. In order to send an assistant message, you first need to write a template message and respond to it.
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
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Message Type</Label>
              <Select
                options={messageTypeOptions}
                value={messageType}
                onChange={setMessageType}
                styles={customStyles}
                className="mt-1"
              />
            </div>
            {messageType.value === "assistant" && (
              <div>
                <Label className="text-sm font-medium">Message Style</Label>
                <Select
                  options={messageStyleOptions}
                  value={messageStyle}
                  onChange={setMessageStyle}
                  styles={customStyles}
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Submit'
            )}
          </Button>
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
