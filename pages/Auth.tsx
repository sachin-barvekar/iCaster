import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Eye, EyeOff, Star, Camera, Users, ArrowLeft } from 'lucide-react'
import heroBg from '@/assets/hero-stage.jpg'

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'artist' | 'recruiter'>('artist')

  const navigate = useNavigate()

  // simple client-side login (mock)
  const handleSignIn = e => {
    e.preventDefault()
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    alert('Signed in successfully!')
    navigate('/dashboard')
  }

  // simple client-side signup (mock)
  const handleSignUp = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    alert(`Account created for ${name} as ${role}`)
    navigate('/dashboard')
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Background overlay with gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-yellow-900/5' />

      {/* Floating elements */}
      <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl' />
      <div className='absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-full blur-xl' />
      <div className='absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 rounded-full blur-xl' />

      <div className='relative z-10 w-full max-w-md px-4'>
        {/* Back to home button */}
        <div className='mb-6'>
          <Link to='/'>
            <Button
              variant='ghost'
              className='text-white/80 hover:text-white hover:bg-white/10'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Home
            </Button>
          </Link>
        </div>
        <Card className='backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl'>
          <CardHeader className='text-center pb-4'>
            <div className='flex justify-center mb-4'>
              <Badge
                variant='secondary'
                className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-white/20'>
                Welcome
              </Badge>
            </div>
            <CardTitle className='text-2xl text-white'>Join iCastar</CardTitle>
            <CardDescription className='text-white/70'>
              Start your entertainment career journey today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue='signin' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 bg-white/10 border border-white/20'>
                <TabsTrigger
                  value='signin'
                  className='text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white'>
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value='signup'
                  className='text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white'>
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value='signin'>
                <form onSubmit={handleSignIn} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='signin-email' className='text-white/90'>
                      Email
                    </Label>
                    <Input
                      id='signin-email'
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signin-password' className='text-white/90'>
                      Password
                    </Label>
                    <div className='relative'>
                      <Input
                        id='signin-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10'
                        required
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white h-11'>
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value='signup'>
                <form onSubmit={handleSignUp} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='signup-name' className='text-white/90'>
                      Full Name
                    </Label>
                    <Input
                      id='signup-name'
                      type='text'
                      placeholder='Enter your full name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-role' className='text-white/90'>
                      Role
                    </Label>
                    <Select
                      value={role}
                      onValueChange={v => setRole(v as 'artist' | 'recruiter')}>
                      <SelectTrigger
                        id='signup-role'
                        className='bg-white/10 border-white/20 text-white'>
                        <SelectValue placeholder='Select your role' />
                      </SelectTrigger>
                      <SelectContent className='bg-purple-500 text-white'>
                        <SelectItem value='artist'>Artist</SelectItem>
                        <SelectItem value='recruiter'>Recruiter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-email' className='text-white/90'>
                      Email
                    </Label>
                    <Input
                      id='signup-email'
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-password' className='text-white/90'>
                      Password
                    </Label>
                    <div className='relative'>
                      <Input
                        id='signup-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Create a password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10'
                        required
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='confirm-password' className='text-white/90'>
                      Confirm Password
                    </Label>
                    <Input
                      id='confirm-password'
                      type='password'
                      placeholder='Confirm your password'
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
                      required
                    />
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white h-11'>
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social stats */}
            <div className='mt-6 pt-6 border-t border-white/20'>
              <p className='text-center text-white/60 text-sm mb-4'>
                Join our community of
              </p>
              <div className='grid grid-cols-3 gap-4 text-center'>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-2'>
                    <Star className='h-5 w-5 text-purple-400' />
                  </div>
                  <span className='text-xs text-white/70'>50K+ Artists</span>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-2'>
                    <Users className='h-5 w-5 text-pink-400' />
                  </div>
                  <span className='text-xs text-white/70'>2K+ Recruiters</span>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-2'>
                    <Camera className='h-5 w-5 text-yellow-400' />
                  </div>
                  <span className='text-xs text-white/70'>100K+ Auditions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth
