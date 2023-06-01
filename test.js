describe('App_function', () => {
  // Tests that clicking the "new cat fact" button displays a new fact and image.
  it('test_new_cat_fact_button_click_displays_new_fact_and_image', async () => {
    const mockFact = 'This is a mock fact'
    const mockImageUrl = 'https://mockimage.com'
    const mockUseFacts = jest.fn(() => ({
      fact: mockFact,
      refreshFact: jest.fn()
    }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: mockImageUrl,
      loading: false,
      setLoading: jest.fn()
    }))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    const button = screen.getByText('new cat fact')
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(mockFact)).toBeInTheDocument()
      expect(screen.getByAltText('img')).toHaveAttribute('src', mockImageUrl)
    })
  })

  // Tests that the fact and image load without errors.
  it('test_fact_and_image_load_without_errors', async () => {
    const mockFact = 'This is a mock fact'
    const mockImageUrl = 'https://mockimage.com'
    const mockUseFacts = jest.fn(() => ({
      fact: mockFact,
      refreshFact: jest.fn()
    }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: mockImageUrl,
      loading: false,
      setLoading: jest.fn()
    }))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    await waitFor(() => {
      expect(screen.getByText(mockFact)).toBeInTheDocument()
      expect(screen.getByAltText('img')).toHaveAttribute('src', mockImageUrl)
    })
  })

  // Tests that the function handles the case when the fact is null or undefined.
  it('test_fact_is_null_or_undefined', async () => {
    const mockUseFacts = jest.fn(() => ({ fact: null, refreshFact: jest.fn() }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: null,
      loading: false,
      setLoading: jest.fn()
    }))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    await waitFor(() => {
      expect(screen.queryByText('loading...')).not.toBeInTheDocument()
      expect(screen.queryByText('null')).not.toBeInTheDocument()
      expect(screen.queryByAltText('img')).not.toBeInTheDocument()
    })
  })

  // Tests that the function handles the case when the image URL is null or undefined.
  it('test_image_url_is_null_or_undefined', async () => {
    const mockFact = 'This is a mock fact'
    const mockUseFacts = jest.fn(() => ({
      fact: mockFact,
      refreshFact: jest.fn()
    }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: null,
      loading: false,
      setLoading: jest.fn()
    }))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    await waitFor(() => {
      expect(screen.queryByText('loading...')).not.toBeInTheDocument()
      expect(screen.getByText(mockFact)).toBeInTheDocument()
      expect(screen.queryByAltText('img')).not.toBeInTheDocument()
    })
  })

  // Tests that the loading message is displayed while fetching the fact or image.
  it('test_loading_message_is_displayed_while_fetching_fact_or_image', async () => {
    const mockUseFacts = jest.fn(() => ({ fact: null, refreshFact: jest.fn() }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: null,
      loading: true,
      setLoading: jest.fn()
    }))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('loading...')).toBeInTheDocument()
    })
  })

  // Tests that the function handles the case when an error occurs while fetching the fact or image.
  it('test_error_occurs_while_fetching_fact_or_image', async () => {
    const mockUseFacts = jest.fn(() => ({ fact: null, refreshFact: jest.fn() }))
    const mockUseImage = jest.fn(() => ({
      imageUrl: null,
      loading: false,
      setLoading: jest.fn()
    }))
    global.fetch = jest.fn(() => Promise.reject('Error'))
    render(
      <App
        useFacts={mockUseFacts}
        useImage={mockUseImage}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('loading...')).toBeInTheDocument()
      expect(console.log).toHaveBeenCalledWith('Error')
    })
  })
})
