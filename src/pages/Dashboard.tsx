import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import CourseSidebar from '../components/layout/CourseSidebar';
import { Menu } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the first module automatically for full mock experience
    navigate('/course/boolean');
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Placeholder while redirecting */}
      </div>
    </div>
  );
}
