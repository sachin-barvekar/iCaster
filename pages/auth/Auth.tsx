import { useState, type FormEvent, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
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
  Eye,
  EyeOff,
  Star,
  Camera,
  Users,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import heroBg from '@/assets/hero-stage.jpg'
import authService, {
  type LoginRequest,
  type RegisterRequest,
} from '@/services/userService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserRole } from '@/types/types'

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [role, setRole] = useState<UserRole>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')
  const navigate = useNavigate()
  const location = useLocation()

  // Clear errors when switching tabs
  useEffect(() => {
    setErrors({})
  }, [activeTab])

  // Read role from query param (passed from AuthPage)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const roleParam = params.get('role')
    if (roleParam === UserRole.ARTIST || roleParam === UserRole.RECRUITER) {
      setRole(roleParam as UserRole)
    }
  }, [location.search])

  const validateSignIn = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateSignIn()) return
    setIsLoading(true)
    try {
      const credentials: LoginRequest = { email, password }
      const { data } = await authService.login(credentials)

      const userRole = data?.role as UserRole
      localStorage.setItem('role', userRole)
      setRole(userRole)

      toast.success('You have successfully logged in!')
      navigate(userRole === UserRole.ARTIST ? '/onboarding' : '/dashboard')
    } catch (error) {
      console.error('Sign in failed:', error)
      const errorMessage =
        error instanceof Error && (error as any).response?.data?.message
          ? (error as any).response.data.message
          : error instanceof Error
          ? error.message
          : 'Sign in failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const validateSignUp = (): boolean => {
    const newErrors: Record<string, string> = {}

    const fn = firstName.trim()
    const ln = lastName.trim()
    if (!fn) {
      newErrors.firstName = 'First name is required'
    } else if (fn.length < 2 || fn.length > 50) {
      newErrors.firstName = 'First name must be between 2 and 50 characters'
    }
    if (!ln) {
      newErrors.lastName = 'Last name is required'
    } else if (ln.length < 2 || ln.length > 50) {
      newErrors.lastName = 'Last name must be between 2 and 50 characters'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    const rawMobile = mobile.trim()
    const normalizedMobile = rawMobile.replace(/[\s\-().]/g, '')
    if (!rawMobile) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[1-9]\d{9}$/.test(normalizedMobile)) {
      newErrors.mobile = 'Invalid mobile number format'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateSignUp()) return
    setIsLoading(true)
    try {
      const rawMobile = mobile.trim()
      const normalizedMobile = rawMobile.replace(/[\s\-().]/g, '')
      const userData: RegisterRequest = {
        email,
        password,
        firstName,
        lastName,
        mobile: normalizedMobile,
        role,
      }
      await authService.register(userData)
      toast.success('Your account has been created successfully!')
      setActiveTab('signin')
    } catch (error) {
      console.error('Sign up failed:', error)
      const errorMessage =
        error instanceof Error && (error as any).response?.data?.message
          ? (error as any).response.data.message
          : error instanceof Error
          ? error.message
          : 'Failed to create account. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
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
      <div className='absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black opacity-90' />

      {/* Floating elements */}
      <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-xl' />
      <div className='absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-xl' />
      <div className='absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl' />

      <div className='relative z-10 w-full max-w-md px-4 py-8'>
        <Card className='backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl'>
          <CardHeader className='text-center pb-4'>
            <div className='flex justify-center mb-4'>
              <Badge
                variant='secondary'
                className='bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-white border-white/20'>
                Welcome
              </Badge>
            </div>
            <CardTitle className='text-2xl text-white'>Join iCastar</CardTitle>
            <CardDescription className='text-white/70'>
              Start your entertainment career journey today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setFirstName('')
                setLastName('')
                setMobile('')
                setErrors({})
              }}
              defaultValue='signin'
              className='w-full'>
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
                    <div className='flex justify-between items-center'>
                      {' '}
                      <Label htmlFor='signin-email' className='text-white/90'>
                        {' '}
                        Email{' '}
                      </Label>{' '}
                      {errors.email && (
                        <span className='text-xs text-red-400'>
                          {errors.email}
                        </span>
                      )}{' '}
                    </div>
                    <Input
                      id='signin-email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <Label
                        htmlFor='signin-password'
                        className='text-white/90'>
                        Password
                      </Label>
                      {errors.password && (
                        <span className='text-xs text-red-400'>
                          {errors.password}
                        </span>
                      )}{' '}
                    </div>
                    <div className='relative'>
                      <Input
                        id='signin-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10 ${
                          errors.password ? 'border-red-500' : ''
                        }`}
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
                    className='w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 transition-all duration-300'
                    disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                  <div className='mt-6 pt-4 border-t border-white/10 text-center'>
                    <Link
                      to='/'
                      className='inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors'>
                      <ArrowLeft className='h-3.5 w-3.5 mr-1.5' />
                      Back to Home
                    </Link>
                  </div>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value='signup'>
                <form onSubmit={handleSignUp} className='space-y-4'>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {/* first Name Field */}
                      <div className='space-y-2 md:col-span-2'>
                        <div className='flex justify-between items-center'>
                          <Label
                            htmlFor='signup-first-name'
                            className='text-white/90'>
                            First Name
                          </Label>
                          {errors.firstName && (
                            <span className='text-xs text-red-400'>
                              {errors.firstName}
                            </span>
                          )}
                        </div>
                        <Input
                          id='signup-first-name'
                          type='text'
                          placeholder='Enter your first name'
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                            errors.firstName ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <div className='space-y-2 md:col-span-2'>
                        <div className='flex justify-between items-center'>
                          <Label
                            htmlFor='signup-last-name'
                            className='text-white/90'>
                            Last Name
                          </Label>
                          {errors.lastName && (
                            <span className='text-xs text-red-400'>
                              {errors.lastName}
                            </span>
                          )}
                        </div>
                        <Input
                          id='signup-last-name'
                          type='text'
                          placeholder='Enter your last name'
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                            errors.lastName ? 'border-red-500' : ''
                          }`}
                        />
                      </div>

                      {/* Email Field */}
                      <div className='space-y-2 md:col-span-2'>
                        <div className='flex justify-between items-center'>
                          <Label
                            htmlFor='signup-email'
                            className='text-white/90'>
                            Email
                          </Label>
                          {errors.email && (
                            <span className='text-xs text-red-400'>
                              {errors.email}
                            </span>
                          )}
                        </div>
                        <Input
                          id='signup-email'
                          placeholder='Enter your email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                    </div>
                    {/* Mobile Field */}
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <Label
                          htmlFor='signup-mobile'
                          className='text-white/90'>
                          Mobile
                        </Label>
                        {errors.mobile && (
                          <span className='text-xs text-red-400'>
                            {errors.mobile}
                          </span>
                        )}
                      </div>
                      <Input
                        id='signup-mobile'
                        placeholder='Enter your mobile number'
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 ${
                          errors.mobile ? 'border-red-500' : ''
                        }`}
                      />
                    </div>

                    {/* Password Field - Full Width */}
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <Label
                          htmlFor='signup-password'
                          className='text-white/90'>
                          Password
                        </Label>
                        {errors.password && (
                          <span className='text-xs text-red-400'>
                            {errors.password}
                          </span>
                        )}
                      </div>
                      <div className='relative'>
                        <Input
                          id='signup-password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Create a password'
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10 w-full ${
                            errors.password ? 'border-red-500' : ''
                          }`}
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

                    {/* Confirm Password Field - Full Width */}
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <Label
                          htmlFor='confirm-password'
                          className='text-white/90'>
                          Confirm Password
                        </Label>
                        {errors.confirmPassword && (
                          <span className='text-xs text-red-400'>
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                      <div className='relative'>
                        <Input
                          id='confirm-password'
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Confirm your password'
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full pr-10 ${
                            errors.confirmPassword ? 'border-red-500' : ''
                          }`}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent'
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 transition-all duration-300'
                    disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Creating account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                  <div className='mt-6 pt-4 border-t border-white/10 text-center'>
                    <Link
                      to='/'
                      className='inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors'>
                      <ArrowLeft className='h-3.5 w-3.5 mr-1.5' />
                      Back to Home
                    </Link>
                  </div>
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
                  <div className='w-10 h-10 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center mb-2'>
                    <Star className='h-5 w-5 text-orange-400' />
                  </div>
                  <span className='text-xs text-white/70'>50K+ Artists</span>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-2'>
                    <Users className='h-5 w-5 text-amber-400' />
                  </div>
                  <span className='text-xs text-white/70'>2K+ Recruiters</span>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-2'>
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
